import React, { useMemo } from 'react';
// import { useDispatch } from 'react-redux';
import { ApiContext } from './index.jsx';
// import { actions as channelsActions } from '../slices/channelsSlice.js';
// import { actions as modalActions } from '../slices/modalSlice.js';

const ApiProvider = ({ socket, children }) => {
  // const dispatch = useDispatch();

  const newChannel = (name, resolve, reject) => socket.timeout(3000).emit('newChannel', { name }, (error, response) => {
    if (error) {
      reject();
    }
    resolve(response);
  });

  const deleteChannel = (id, resolve, reject) => socket.timeout(3000).emit('removeChannel', { id }, (error) => {
    if (error) {
      reject();
    }
    resolve();
  });

  const renameChannel = ({ id, name }, resolve, reject) => socket
    .timeout(3000)
    .emit('renameChannel', { id, name }, (error) => {
      if (error) {
        reject();
      }
      resolve();
    });

  const newMessage = (message, resolve, reject) => socket.timeout(3000).emit('newMessage', message, (error) => {
    if (error) {
      reject();
    }
    resolve();
  });

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
