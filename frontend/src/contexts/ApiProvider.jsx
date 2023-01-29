import React, { useMemo, useCallback } from 'react';
import { ApiContext } from './index.jsx';

const ApiProvider = ({ socket, children }) => {
  const newChannel = useCallback((name, resolve, reject) => socket.timeout(3000).emit('newChannel', { name }, (error, response) => {
    if (error) {
      reject();
    } else {
      resolve(response);
    }
  }), [socket]);

  const deleteChannel = useMemo((id, resolve, reject) => socket.timeout(3000).emit('removeChannel', { id }, (error) => {
    if (error) {
      reject();
    } else {
      resolve();
    }
  }), [socket]);

  const renameChannel = useCallback(({ id, name }, resolve, reject) => socket
    .timeout(3000)
    .emit('renameChannel', { id, name }, (error) => {
      if (error) {
        console.log('reneme chn err', error);
        reject();
      } else {
        resolve();
      }
    }), [socket]);

  const newMessage = useCallback((message, resolve, reject) => socket.timeout(3000).emit('newMessage', message, (error) => {
    if (error) {
      reject();
    } else {
      resolve();
    }
  }), [socket]);

  const api = useMemo(() => ({
    newChannel,
    deleteChannel,
    renameChannel,
    newMessage,
  }), [deleteChannel, newChannel, newMessage, renameChannel]);

  return (
    <ApiContext.Provider
      value={api}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
