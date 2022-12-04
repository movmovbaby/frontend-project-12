import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('navbar.brand')}</Navbar.Brand>
        {auth.loggedIn
          && (
            <Button
              variant="primary"
              onClick={() => {
                auth.logOut();
                navigate('login');
              }}
            >
              {t('navbar.button')}
            </Button>
          )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
