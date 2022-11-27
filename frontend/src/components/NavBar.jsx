import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import useAuth from "../hooks/index.jsx";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    < Navbar bg="white" expand="lg" className='shadow-sm' >
      <Container>
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        {auth.loggedIn && (
          <Button variant="primary" onClick={() => {
            auth.logOut();
            navigate('login');
          }}>Выйти</Button>)}
      </Container>
    </Navbar >
  )
};

export default NavBar;
