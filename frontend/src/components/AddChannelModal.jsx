import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import * as yup from 'yup';
import { selectors } from '../slices/channelsSlice.js';

const AddChannelModal = ({ socket }) => {
  const [modalShow, setModalShow] = useState(false);
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
    }),
    onSubmit: (values) => {
      const { name } = values;
      const isntUnique = channelsNames.some((channelName) => channelName === name);

      if (isntUnique) {
        formik.setErrors({ 'name': 'Должно быть уникальным' });
        return;
      }

      socket.timeout(3000).emit('newChannel', { name }, (error) => {
        if (error) {
          formik.setErrors({ 'name': 'Ошибка сети' });
        } else {
          setModalShow(false);
        }
      });
    }
  });
  console.log('useFormik Errors', formik.errors);

  return (
    <>
      <Button
        type="button"
        className='p-0 text-primary btn btn-group-vertical'
        variant="btn-primary-outline"
        onClick={() => setModalShow(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
        <span className='visually-hidden'>+</span>
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить канал
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                id='name'
                name='name'
                className='mb-2'
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="name"
                disable={formik.isSubmitting === true ? 'true' : 'false'}
                autoFocus={true}
                isInvalid={!!formik.errors.name}
              />
              <Form.Label visuallyHidden>Имя канала</Form.Label>
              {formik.errors.name ? (
                < Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>) : null
              }
              <div className='d-flex justify-content-end'>
                <Button className='me-2' onClick={() => setModalShow(false)} variant='secondary' >Отменить</Button>
                <Button type='submit'>Отправить</Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddChannelModal;
