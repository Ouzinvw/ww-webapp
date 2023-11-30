import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
const navigate = useNavigate();
const isLoggedIn = localStorage.getItem('token');

const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/');
};

const logoStyle = {
    marginLeft: '20px'
  };

const linkStyle = {
  marginLeft: 'auto',
  marginRight: '20px'
};

const btnStyle = {
  marginLeft: '6px'
};

  return (
    <Navbar bg="light" data-bs-theme="dark">
        <Navbar.Brand href="/about" style={logoStyle}>
          <img
            src="../ww_logo.png"
            width="273"
            height="90"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Nav style={linkStyle}>
        {isLoggedIn && (
            <Nav.Link className='text-dark' href="/about">ABOUT</Nav.Link>
          )}
          {isLoggedIn && (
            <Nav.Link className='text-dark' href="/dashboard">DASHBOARD</Nav.Link>
          )}
          {isLoggedIn && (
            <Nav.Link className='text-dark' href="/edit-profile">PROFILE</Nav.Link>
          )}
          {isLoggedIn ? (
            <Button style={btnStyle} variant="outline-primary" onClick={handleLogout}>LOGOUT</Button>
          ) : (
            <Link to="/"><Button variant="primary">LOGIN</Button></Link>
          )}
        </Nav>
    </Navbar>
  );
};

export default NavBar;