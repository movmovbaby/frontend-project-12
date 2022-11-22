import React from "react";
import { useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const MessageForm = ({ socket }) => {
  const currentChannelId = useSelector(state => state.channelsInfo.currentChannelId);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: yup.object().shape({
      message: yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log('MSG=', values.message);
      const message = { body: values.message, username: localStorage.getItem('username'), channelId: currentChannelId };
      socket.timeout(3000).emit('newMessage', message, (error) => {
        if (error) {
          console.log('Socket.io error while emit message');
        }
      });
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
          disable={formik.isSubmitting === true ? 'true' : 'false'}
        />
        <Button className='btn-group-vertical' type='submit'>send</Button>
      </InputGroup>
    </Form>
  )
};

export default MessageForm;
