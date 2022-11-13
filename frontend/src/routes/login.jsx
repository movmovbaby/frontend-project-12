import React, { useState } from "react";
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes.jsx';
import useAuth from "../hooks/index.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        const { token } = response.data;
        localStorage.setItem('username', token);
        auth.logIn();
        navigate('/');
      } catch (error) {
        if (error.name === 'AxiosError') {
          console.error('Unauthorized', error);
        }
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0 position-relative" noValidate onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>

      <FloatingLabel
        label="Ваш ник"
        className="mb-3"
      >
        <Form.Control
          name="username"
          id="username"
          type="text"
          autoComplete="username"
          required=""
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
      </FloatingLabel>

      <FloatingLabel
        label="Пароль"
        className="mb-4"
      >
        <Form.Control
          name="password"
          id="password"
          typr="text"
          autoComplete="current-password"
          required=""
          placeholder="Пароль"
          type="password"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
      </FloatingLabel>
      <Button type="submit" variant="btn btn-outline-primary">Войти</Button>
    </Form>
    //w-100 mb-3 
  )
};

export default LoginPage;
