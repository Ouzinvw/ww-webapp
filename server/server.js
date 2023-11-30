const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/userModel.js');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Port loaded: '+process.env.PORT);

const mongoURI = 'mongodb+srv://admin:rbOhM4W6RRMBF638@webapp.juhhglb.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Authenticate jwt token
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    const user = await User.findOne({ username: decoded.username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Get user
app.get('/api/get-user-data', authenticateToken, async (req, res) => {
  const username = req.user.username;
  const userData = await User.findOne({ username });
  console.log('Populating user data for:', { username });
  
  try {
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userDataToSend = {
      name: userData.name,
      email: userData.email,
      occupation: userData.occupation,
    };

    res.json(userDataToSend);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Load dashboard
app.get('/api/dashboard', authenticateToken, async (req, res) => {
    try {
      const username = req.user.username;
      const userData = await User.findOne({ username });
      console.log('Loading dashboard for user:', { username });
  
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
      const dashboardData = {
        username: userData.username
      };
  
      res.json({ message: `Welcome to the dashboard, ${username}!`, data: dashboardData });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Update user
app.put('/api/edit-profile', authenticateToken, async (req, res) => {
  const { name, email, occupation } = req.body;
  console.log('Attempting to update user');

  try {
    const user = req.user;

    user.name = name || user.name;
    user.email = email || user.email;
    user.occupation = occupation || user.occupation;

    await user.save();

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error during profile update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register user
app.post('/api/register', async (req, res) => {
  const { username, password, name, email, occupation } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, name, email, occupation });
    await newUser.save();

    const token = jwt.sign({ username }, 'your_secret_key');

    res.status(201).json({ token, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request:', { username, password });
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
