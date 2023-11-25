import React, { useState } from 'react';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/login', { username, password });
      console.log('Request payload:', { username, password });
      const token = response.data.token;
  
      if (token) {
        localStorage.setItem('token', token);
        setLoading(false);
        navigate('/dashboard');
      } else {
        setLoading(false);
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      setError('Invalid username or password. Please try again.');
      console.error('Login failed:', error.response.data.error);
    }
  };
  

  return (
    <div className="container mt-5">
        <div className='offset-md-3 col-md-6 col-sm-12'>
            <h1 class="text-center text-primary fw-bold">WeatherWear login</h1>
            <p class="text-center">Please enter your account information.</p>
            <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Control className='my-2' type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control className='my-2' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <div className='d-flex justify-content-center'>
                <Button className='btn btn-primary btn-md' onClick={handleLogin} disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                </Button>
            </div>

            <hr/>
            <Link to="/register">
              <p class="text-center text-muted small">Don't have an account? Register here.</p>
            </Link>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
        </div>
    </div>
  );
};

export default Login;