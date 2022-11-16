/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMessages, selectors } from '../slices/messagesSlice.js';

const Messages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  const messages = useSelector(selectors.selectAll);

  return messages && (
    <ul>
      {messages.map(({ id, body }) => (
        <li key={id}>
          <button>{body}</button>
        </li>
      ))}
    </ul>
  )
};


export default Messages;
