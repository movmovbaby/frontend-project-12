/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, selectors } from '../slices/messagesSlice.js';
import { actions as messageActions } from '../slices/messagesSlice.js'
import MessageForm from './MessageForm.jsx';

const Messages = ({ socket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  socket.on('newMesasge', (msg) => {
    dispatch(messageActions.addMessage(msg));
  });


  const messages = useSelector(selectors.selectAll);

  return messages && (
    <>
      <div className='d-flex flex-column h-100'>
        <div className='bg-light mb-4 p-3 shadow-sm small'>
          <p className='m-0'>
            <b># general</b>
          </p>
          <span className='text-muted'>0 messages</span>
        </div>
        <div id='message-box' className='chat-messages overflow-auto px-5 '>
          {messages.map(({ id, body }) => (
            <li key={id}>
              <button>{body}</button>
            </li>
          ))}
        </div>
        <div className='mt-auto px-5 py-3'>
          <MessageForm socket={socket} />
        </div>
      </div>
    </>

  )
};


export default Messages;
