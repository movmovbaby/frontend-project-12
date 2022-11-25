import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import * as yup from 'yup';
import { selectors } from '../slices/channelsSlice.js';
import { actions as modalActions } from '../slices/modalSlice.js';

const AddChannelModal = ({ socket }) => {
  const [modalShow, setModalShow] = useState(true);
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const dispatch = useDispatch();

  const closeModal = () => {
    setModalShow(false);
    dispatch(modalActions.closeModal());
  }

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
          dispatch(modalActions.closeModal());
        }
      });
    }
  });

  return (
    <Modal
      show={modalShow}
      onHide={() => closeModal()}
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
              </Form.Control.Feedback>) : null}
            <div className='d-flex justify-content-end'>
              <Button className='me-2'
                onClick={() => closeModal()}
                variant='secondary' >
                Отменить
              </Button>
              <Button type='submit'>Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddChannelModal;
