import React from 'react';
import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import DeleteChannelModal from './DeleteChannelModal';
import RenameChannelModal from './RenameChannelModal';

const Modal = ({ socket }) => {
  const type = useSelector((state) => state.modal.type);

  switch (type) {
    case 'addChannel':
      return (<AddChannelModal socket={socket} />);

    case 'deleteChannel':
      return (<DeleteChannelModal socket={socket} />);

    case 'renameChannel':
      return (<RenameChannelModal socket={socket} />);

    default:
      return null;
  }
};

export default Modal;
