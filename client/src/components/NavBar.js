import React from 'react';
import { Navbar } from 'react-bootstrap';

const NavBar = () => {
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
    </Navbar>
  );
};

export default NavBar;