import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectors, actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as modalActions } from '../slices/modalSlice.js';

const AddChannelModal = ({ socket }) => {
  const [modalShow, setModalShow] = useState(true);
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const closeModal = () => {
    setModalShow(false);
    dispatch(modalActions.closeModal());
  };

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
        formik.setErrors({ name: t('addChannel.errors.uniqueName') });
        return;
      }

      socket.timeout(3000).emit('newChannel', { name }, (error, response) => {
        if (error) {
          formik.setErrors({ name: t('addChannel.errors.network') });
        } else {
          console.log("SERVER RESPONSE", response);
          dispatch(channelsActions.setActiveChannel(response.data.id));
          dispatch(modalActions.closeModal());
          toast.success(t('addChannel.success'));
        }
      });
    },
  });

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => closeModal()}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t('addChannel.title')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                id="name"
                name="name"
                className="mb-2"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="name"
                disable={formik.isSubmitting.toString()}
                autoFocus
                isInvalid={!!formik.errors.name}
              />
              <Form.Label htmlFor="name" visuallyHidden>{t('addChannel.form.label')}</Form.Label>
              {formik.errors.name
                ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                ) : null}
              <div className="d-flex justify-content-end">
                <Button
                  className="me-2"
                  onClick={() => closeModal()}
                  variant="secondary"
                >
                  {t('addChannel.button.cancel')}
                </Button>
                <Button type="submit" disable={formik.isSubmitting.toString()}>{t('addChannel.button.send')}</Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannelModal;
