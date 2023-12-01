import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/get-user-data', {
            headers: { Authorization: token },
          });
  
          if (response.status === 200) {
            const userData = response.data;
            console.log('User data from server:', userData);
            setName(userData.name);
            setEmail(userData.email);
            setOccupation(userData.occupation);
            setLoading(false);
          } else {
            console.error('Error fetching user data:', response.statusText);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error during data fetch:', error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:5000/api/edit-profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ name, email, occupation }),
        });

        if (response.ok) {
          console.log('User profile updated successfully');
          navigate('/dashboard')
        } else {
          const data = await response.json();
          setError(data.error);
          console.error('Profile update failed:', data.error);
        }
      }
    } catch (error) {
      setError('Error during profile update');
      console.error('Error during profile update:', error.message);
    }
  };

  const btnSpacing = {
    margin: '5px'
  }

  return (
    <div className="container mt-5">
      <div className='offset-md-3 col-md-6 col-sm-12'>
        <h1 className="text-center text-primary fw-bold">Update your profile</h1>
        <p className='lead text-center'>You may only update your personal information, if you wish to change your username or password, you may create a new account&nbsp;
        <Link to="/register" className='text-decoration-none'>
        <a>here.</a>
        </Link>
        </p>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Control className='my-2' type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control className='my-2' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicOccupation">
            <Form.Control className='my-2' type="text" placeholder="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
          </Form.Group>
          <div className='d-flex justify-content-center'>
            <Button style={btnSpacing} className='btn btn-primary btn-md' onClick={handleUpdateProfile} disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
            <Button style={btnSpacing} variant='outline-primary' onClick={() => navigate('/dashboard')}>
              Back to dashboard
            </Button>
          </div>
          <hr/>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
