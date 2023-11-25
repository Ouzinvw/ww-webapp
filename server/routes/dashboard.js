const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js');

router.get('/dashboard', authenticate, (req, res) => {
  res.json({ message: `Welcome to the dashboard, ${req.user.username}!` });
});

module.exports = router;
