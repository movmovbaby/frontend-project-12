import React from "react";
import { Container, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

const NavBar = () => (
  <Navbar bg="white" expand="lg" className='shadow-sm'>
    <Container>
      <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
    </Container>
  </Navbar>
)

export default NavBar;
