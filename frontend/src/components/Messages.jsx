/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, selectors } from '../slices/messagesSlice.js';
import MessageForm from './MessageForm.jsx';

const Messages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

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
          {/* <InputGroup className='py-1 border rounded-2'>
            <Form.Control className='border-0 p-0 ps-2 form-control' placeholder='Введите сообщение' aria-label='Новое сообщение' value='' />
            <Button className='btn-group-vertical' type='submit' disabled></Button>
          </InputGroup> */}
          <MessageForm />
        </div>
      </div>
    </>

  )
};


export default Messages;
