import React from "react";
import { useSelector } from 'react-redux';
import AddChannelModal from "./AddChannelModal";
import DeleteChannelModal from "./DeleteChannelModal";
import RenameChannelModal from "./RenameChannelModal";

const Modal = (props) => {
  const type = useSelector((state) => state.modal.type);

  switch (type) {
    case 'addChannel':
      return (<AddChannelModal socket={props.socket} />);

    case 'deleteChannel':
      return (<DeleteChannelModal socket={props.socket} />);

    case 'renameChannel':
      return (<RenameChannelModal socket={props.socket} />);

    default:
      return null;
  }
}

export default Modal;
