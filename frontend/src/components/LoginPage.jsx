import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import LoginForm from './LoginForm.jsx';
import Wrapper from './Wrapper.jsx';
import image from '../assets/man.jpg';

const LoginPage = () => (
  <Wrapper>
    <Container className='h-100' fluid>
      <Row className='justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <Card className='shadow-sm'>
            <Card.Body className='row p-5'>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                <Image
                  src={image}
                  roundedCircle
                  alt='Войти'
                />
              </div>
              <LoginForm />
            </Card.Body>
            <Card.Footer className='p-4'>
              <div className='text-center'>
                <span>Нет аккаунта?</span> <a href='/signup'>Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </Container>
  </ Wrapper>
);

export default LoginPage;
