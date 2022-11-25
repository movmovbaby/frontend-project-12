import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { actions as modalActions } from '../slices/modalSlice.js';

const DeleteChannelModal = ({ socket }) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalShow(false);
    dispatch(modalActions.closeModal());
  }

  const deleteChannel = (channel) => {
    socket.timeout(3000).emit('removeChannel', { id: channel.id }, (error) => {
      if (error) {
        console.log('Ошибка сети');
      } else {
        setModalShow(false);
        dispatch(modalActions.closeModal());
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
          <Button variant='danger' type='submit'>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteChannelModal;
