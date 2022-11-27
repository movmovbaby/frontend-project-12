import React from "react";
import { useFormik } from 'formik';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as yup from 'yup';
import routes from '../routes.js'
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/index.jsx";

const SignupForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов'),
      password: yup
        .string()
        .required()
        .min(6, 'Не менее 6 символов'),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const { username, password } = values;
      formik.setSubmitting(true);
      try {
        const { data } = await axios.post(routes.signupPath(), { username, password });
        if (data) {
          const { username, token } = data;
          auth.setUserIn({ username, token });
          auth.logIn();
          formik.setSubmitting(false);
          navigate('/');
        }
      } catch (error) {
        console.log('signup error', error);

        if (error.name === 'AxiosError') {
          formik.setSubmitting(false);
          formik.setErrors({ 'username': '    ' });
          formik.setErrors({ 'password': '    ' });
          formik.setErrors({ 'confirmPassword': 'Такой пользователь уже существует' });
          console.log('Formik', formik)
          console.log('Signup failed');
        }
      }
    },
  })


  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Регистрация</h1>

      <FloatingLabel
        label="Имя пользователя"
        className="mb-3"
      >
        <Form.Control
          name="username"
          id="username"
          type="text"
          autoComplete="username"
          required
          placeholder="Имя пользователя"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={!!formik.errors.username && formik.touched.username}
        />
        <Form.Control.Feedback type='invalid' tooltip>{formik.errors.username}</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        label="Пароль"
        className="mb-3"
      >
        <Form.Control
          name="password"
          id="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Пароль"
          className="form-control"
          aria-describedby="passwordHelpBlock"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={!!formik.errors.password && formik.touched.password}
        />
        <Form.Control.Feedback type='invalid' tooltip>{formik.errors.password}</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        label="Подтвердите пароль"
        className="mb-4"
      >
        <Form.Control
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Подтвердите пароль"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
        />
        <Form.Control.Feedback type='invalid' tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>
      </FloatingLabel>
      <Button type='submit' className="w-100" variant='outline-primary' disabled={formik.isSubmitting}>Зарегистрироваться</Button>
    </Form>
  )
}

export default SignupForm;