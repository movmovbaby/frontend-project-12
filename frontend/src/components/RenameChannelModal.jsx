import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectors } from '../slices/channelsSlice.js';
import { actions as modalActions } from '../slices/modalSlice.js';

const RenameChannelModal = ({ socket }) => {
  const [modalShow, setModalShow] = useState(true);
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const { channelId } = useSelector((state) => state.modal.extra);
  const renamingChannel = useSelector((state) => selectors.selectById(state, channelId));

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const closeModal = () => {
    setModalShow(false);
    dispatch(modalActions.closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: renamingChannel.name,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
    }),
    onSubmit: (values) => {
      const { name } = values;
      const isntUnique = channelsNames.some((channelName) => channelName === name);

      if (isntUnique) {
        formik.setErrors({ name: t('renameChannel.error.uniqueName') });
        return;
      }

      socket.timeout(3000).emit('renameChannel', { id: channelId, name }, (error) => {
        if (error) {
          formik.setErrors({ name: t('renameChannel.error.network') });
        } else {
          setModalShow(false);
          dispatch(modalActions.closeModal());
          toast.success(t('renameChannel.success'));
        }
      });
    },
  });

  return (
    <Modal
      show={modalShow}
      onHide={() => closeModal()}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Переименовать канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              id="name"
              name="name"
              className="mb-2"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="name"
              disable={formik.isSubmitting}
              autoFocus={true}
              isInvalid={!!formik.errors.name}
            />
            <Form.Label htmlFor="name" visuallyHidden>{t('renameChannel.form.label')}</Form.Label>
            {formik.errors.name ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>) : null}
            <div className="d-flex justify-content-end">
              <Button className="me-2"
                onClick={() => closeModal()}
                variant="secondary"
              >
                {t('renameChannel.button.cancel')}
              </Button>
              <Button type="submit">{t('renameChannel.button.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
