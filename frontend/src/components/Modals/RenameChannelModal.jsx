import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectors } from '../../slices/channelsSlice.js';
import { actions as modalActions } from '../../slices/modalSlice.js';
import { useApi } from '../../hooks/index.jsx';

const RenameChannelModal = () => {
  const [modalShow, setModalShow] = useState(true);
  const api = useApi();
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

      const result = api.renameChannel({ channelId, name });
      console.log('rename chan', result);
      if (result) {
        toast.success(t('renameChannel.success'));
      } else {
        formik.setErrors({ name: t('renameChannel.error.network') });
      }
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
          {t('renameChannel.title')}
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
              disable={formik.isSubmitting.toString()}
              autoFocus
              isInvalid={!!formik.errors.name}
            />
            <Form.Label htmlFor="name" visuallyHidden>{t('renameChannel.form.label')}</Form.Label>
            {formik.errors.name
              ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              )
              : null}
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                onClick={() => closeModal()}
                variant="secondary"
              >
                {t('renameChannel.button.cancel')}
              </Button>
              <Button type="submit" disable={formik.isSubmitting.toString()}>{t('renameChannel.button.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
