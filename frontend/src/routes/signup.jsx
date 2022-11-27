import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import SignupForm from '../components/SignupForm.jsx';
import Wrapper from '../components/Wrapper.jsx';
import image from '../assets/signup_man.jpg'

const SignupPage = () => (
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
                  alt='Регистрация'
                />
              </div>
              <SignupForm />
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  </ Wrapper>
);

export default SignupPage;
