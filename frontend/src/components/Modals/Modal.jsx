import React from 'react';
import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import DeleteChannelModal from './DeleteChannelModal';
import RenameChannelModal from './RenameChannelModal';

const Modal = () => {
  const type = useSelector((state) => state.modal.type);

  switch (type) {
    case 'addChannel':
      return (<AddChannelModal />);

    case 'deleteChannel':
      return (<DeleteChannelModal />);

    case 'renameChannel':
      return (<RenameChannelModal />);

    default:
      return null;
  }
};

export default Modal;
