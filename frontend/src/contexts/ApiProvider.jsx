import React, { useMemo } from 'react';
import { ApiContext } from './index.jsx';

const ApiProvider = ({ socket, children }) => {
  const newChannel = (name, resolve, reject) => socket.timeout(3000).emit('newChannel', { name }, (error, response) => {
    if (error) {
      reject();
    } else {
      resolve(response);
    }
  });

  const deleteChannel = (id, resolve, reject) => socket.timeout(3000).emit('removeChannel', { id }, (error) => {
    if (error) {
      reject();
    } else {
      resolve();
    }
  });

  const renameChannel = ({ id, name }, resolve, reject) => socket
    .timeout(3000)
    .emit('renameChannel', { id, name }, (error) => {
      if (error) {
        console.log('reneme chn err', error);
        reject();
      } else {
        resolve();
      }
    });

  const newMessage = (message, resolve, reject) => socket.timeout(3000).emit('newMessage', message, (error) => {
    if (error) {
      reject();
    } else {
      resolve();
    }
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
