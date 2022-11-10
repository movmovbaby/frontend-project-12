import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('Required'),
      password: yup.string().required('No password provided.').min(4, 'Password is too short - 4 chars minimum.')
    })
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 class="text-center mb-4">Войти</h1>
      <div class="form-floating mb-3">
        <input
          name="username"
          id="username"
          type="text"
          autocomplete="username"
          required=""
          placeholder="Ваш ник"
          class="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />

        {formik.touched.username && formik.errors.username
          ? (<div>{formik.errors.username}</div>)
          : null
        }
        <label for="username">Ваш ник</label>
      </div>
      <div class="form-floating mb-4">
        <input
          name="password"
          id="password"
          typr="text"
          autocomplete="current-password"
          required=""
          placeholder="Пароль"
          type="password"
          class="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password
          ? (<div>{formik.errors.password}</div>)
          : null
        }
        <label class="form-label" for="password">Пароль</label>
      </div>
      <button type="submit" class="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  )
};

export default LoginPage;
