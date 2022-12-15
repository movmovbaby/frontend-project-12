import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { actions as modalActions } from '../../slices/modalSlice.js';
import { useApi } from '../../hooks/index.jsx';

const DeleteChannelModal = () => {
  const [modalShow, setModalShow] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channelId } = useSelector((state) => state.modal.extra);
  const api = useApi();

  const closeModal = () => {
    setModalShow(false);
    dispatch(modalActions.closeModal());
  };

  const result = api.deleteChannel(channelId);
  if (result) {
    toast.success(t('deleteChannel.success'));
  } else {
    toast.error(t('deleteChannel.error.network'));
  }

  return (
    <Modal
      show={modalShow}
      onHide={() => closeModal()}
      centered
    >
      <Modal.Header>
        <Modal.Title>{t('deleteChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => closeModal()}>
            {t('deleteChannel.button.cancel')}
          </Button>
          <Button variant="danger" onClick={() => api.deleteChannel(channelId)}>
            {t('deleteChannel.button.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModal;
