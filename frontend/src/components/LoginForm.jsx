import React, { useState } from "react";
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import useAuth from "../hooks/index.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [loginError, setLoginError] = useState('');
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
      formik.setSubmitting(true);
      try {
        const response = await axios.post(routes.loginPath(), values);
        if (response.data) {
          const { username, token } = response.data;
          localStorage.setItem('username', username);
          localStorage.setItem('token', token);
          formik.setSubmitting(false);
          auth.logIn();
          navigate('/');
        }
      } catch (error) {
        if (error.name === 'AxiosError') {
          formik.setSubmitting(false);
          setLoginError('Login failed');
        }
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0 position-relative" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('loginPage.title')}</h1>

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
          isInvalid={!!loginError}
        />
      </FloatingLabel>

      <FloatingLabel
        label="Пароль"
        className="mb-4"
      >
        <Form.Control
          name="password"
          id="password"
          type="password"
          autoComplete="current-password"
          required=""
          placeholder="Пароль"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={!!loginError}
        />
        <Form.Control.Feedback type='invalid' tooltip>{'Неверные имя пользователя или пароль'}</Form.Control.Feedback>
      </FloatingLabel>

      <Button type="submit" variant="outline-primary">Войти</Button>
    </Form>
  )
};

export default LoginForm;
