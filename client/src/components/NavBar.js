import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
const navigate = useNavigate();
const isLoggedIn = localStorage.getItem('token');

const handleLogout = () => {
  // Add logic to clear the user's session (e.g., remove the token)
  localStorage.removeItem('token');
  // Add any other logout logic as needed
  navigate('/');
};

const logoStyle = {
    marginLeft: '20px', // Adjust the value to set the desired left margin
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/about" style={logoStyle}>
        <img
          src="../ww_logo.png"
          width="273"
          height="90"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Nav className="ml-auto">
        {isLoggedIn ? (
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to="/">
            <Button variant="primary">Login</Button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/edit-profile">
            <Button variant="secondary" className="ml-2">
              Edit Profile
            </Button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/dashboard">
            <Button variant="secondary" className="ml-2">
              Dashboard
            </Button>
          </Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;