import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const SignupForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required()
        .min(3, t('signupForm.validationError.usernameField'))
        .max(20, t('signupForm.validationError.usernameField')),
      password: yup
        .string()
        .required()
        .min(6, t('signupForm.validationError.passwordField')),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null], t('signupForm.validationError.confirmPasswordField')),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;
      formik.setSubmitting(true);
      try {
        const { data } = await axios.post(routes.signupPath(), { username, password });
        if (data) {
          const { name, token } = data;
          auth.setUserIn({ username: name, token });
          auth.logIn();
          formik.setSubmitting(false);
          navigate('/');
        }
      } catch (error) {
        console.log('signup error', error);

        if (error.name === 'AxiosError') {
          formik.setSubmitting(false);
          formik.setErrors({ username: '    ' });
          formik.setErrors({ password: '    ' });
          formik.setErrors({ confirmPassword: t('signupForm.validationError.userAlreadyExist') });
          console.log('Formik', formik);
          console.log('Signup failed');
        }
      }
    },
  });

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signupForm.title')}</h1>

      <FloatingLabel
        label={t('signupForm.usernameLabel')}
        className="mb-3"
        controlId="username"
      >
        <Form.Control
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder={t('signupForm.usernameLabel')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={!!formik.errors.username && formik.touched.username}
        />
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        label={t('signupForm.passwordLabel')}
        className="mb-3"
        controlId="password"
      >
        <Form.Control
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder={t('signupForm.usernameLabel')}
          className="form-control"
          aria-describedby="passwordHelpBlock"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={!!formik.errors.password && formik.touched.password}
        />
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        label={t('signupForm.confirmPassword')}
        className="mb-4"
        controlId="confirmPassword"
      >
        <Form.Control
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          placeholder={t('signupForm.confirmPassword')}
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
        />
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>
      </FloatingLabel>
      <Button type="submit" className="w-100" variant="outline-primary" disabled={formik.isSubmitting}>{t('signupForm.submitButtonText')}</Button>
    </Form>
  );
};

export default SignupForm;
