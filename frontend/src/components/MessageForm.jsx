import React from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';



const MessageForm = ({ socket }) => {

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: yup.object().shape({
      message: yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log('MSG=', values.message);
      const message = { body: values.message }
      socket.emit('newMessage', message);
      values.message = '';
    },
  });

  return (
    <Form className='py-1 border rounded-2' onSubmit={formik.handleSubmit}>
      <InputGroup >
        <Form.Control
          className='border-0 p-0 ps-2 form-control'
          placeholder='Введите сообщение'
          aria-label='Новое сообщение'
          id='message'
          name='message'
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="message"
          required=""
        />
        <Button className='btn-group-vertical' type='submit'>send</Button>
      </InputGroup>
    </Form>
  )
};

export default MessageForm;
