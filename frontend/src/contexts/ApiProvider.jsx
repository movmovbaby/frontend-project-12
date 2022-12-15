import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ApiContext } from './index.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as modalActions } from '../slices/modalSlice.js';

const ApiProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const newChannel = (name) => (
    socket.timeout(3000).emit('newChannel', { name }, (error, response) => {
      if (error) {
        return false;
      }
      dispatch(channelsActions.setActiveChannel(response.data.id));
      dispatch(modalActions.closeModal());
      return true;
    })
  );

  const deleteChannel = (id) => (
    socket.timeout(3000).emit('removeChannel', { id }, (error) => {
      if (error) {
        return false;
      }
      dispatch(channelsActions.setActiveChannel(1));
      dispatch(modalActions.closeModal());
      return true;
    })
  );

  const renameChannel = ({ id, name }) => (
    socket.timeout(3000).emit('renameChannel', { id, name }, (error) => {
      if (error) {
        return false;
      }
      dispatch(modalActions.closeModal());
      return true;
    })
  );

  const newMessage = (message) => (
    socket.timeout(3000).emit('newMessage', message, (error) => {
      if (error) {
        return false;
      }
      return true;
    })
  );

  const api = useMemo(() => ({
    newChannel,
    deleteChannel,
    renameChannel,
    newMessage,
  }), []);

  return (
    <ApiContext.Provider
      value={api}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
