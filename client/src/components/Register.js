import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, name, email, occupation }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        if (token) {
          localStorage.setItem('token', token);
          navigate('/dashboard');
        } else {
          console.error('Token not received in registration response');
        }
      } else {
        const data = await response.json();
        setError(data.error);
        console.error('Registration failed:', data.error);
      }
    } catch (error) {
      setError('Error during registration');
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div className="container mt-5">
        <div className='offset-md-3 col-md-6 col-sm-12'>
        <h1 class="text-center text-primary fw-bold">Register an account</h1>
        <p class="lead text-center">Give yourself complete access to top-tier api services at any time for all your practical needs.</p>
        <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Control className='my-2' type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control className='my-2' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <p className='lead text-center'>The information above will be your login credentials.</p>
        <hr/>
        <Form.Group controlId="formBasicName">
          <Form.Control className='my-2' type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control className='my-2' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicOccupation">
          <Form.Control className='my-2' type="text" placeholder="Occupation" onChange={(e) => setOccupation(e.target.value)} />
        </Form.Group>

        <div className='d-flex justify-content-center'>
                <Button className='btn btn-primary btn-md' onClick={handleRegister}> Register
                </Button>
            </div>

            <hr/>
            <Link to="/">
              <p class="text-center text-muted small">Already have an account? Login here.</p>
            </Link>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Form>
        </div>
    </div>
  );
};

export default Register;
