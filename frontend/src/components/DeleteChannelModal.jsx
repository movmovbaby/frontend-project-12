import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { actions as modalActions } from '../slices/modalSlice.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';


const DeleteChannelModal = ({ socket }) => {
  const [modalShow, setModalShow] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channelId } = useSelector((state) => state.modal.extra);


  const closeModal = () => {
    setModalShow(false);
    dispatch(modalActions.closeModal());
  }

  const deleteChannel = (channelId) => {
    socket.timeout(3000).emit('removeChannel', { id: channelId }, (error) => {
      if (error) {
        console.log(t('deleteChannel.errors.network'));
      } else {
        setModalShow(false);
        dispatch(modalActions.closeModal());
        toast.success(t('deleteChannel.success'))
      }
    });
  };

  return (
    <Modal
      show={modalShow}
      onHide={() => closeModal()}
      centered>
      <Modal.Header>
        <Modal.Title>Удалить канал?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Уверены?
        <div className='d-flex justify-content-end'>
          <Button className='me-2' onClick={() => closeModal()}>
            Отменить</Button>
          <Button variant='danger' onClick={() => deleteChannel(channelId)}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteChannelModal;
