import React from "react";
import { Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

const NavBar = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
  </Navbar>
)

export default NavBar;
