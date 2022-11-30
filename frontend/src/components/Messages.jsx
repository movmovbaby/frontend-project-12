/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, selectors } from '../slices/messagesSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js'
import MessageForm from './MessageForm.jsx';
import { selectors as channelsSelector } from '../slices/channelsSlice.js';
import { useTranslation } from 'react-i18next';

const Messages = ({ socket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  socket.on('newMessage', (msg) => {
    dispatch(messagesActions.addMessage(msg));
  });

  const messages = useSelector(selectors.selectAll);
  const activeChannelId = useSelector(state => state.channelsInfo.currentChannelId);
  const activeChannel = useSelector((state) => channelsSelector.selectById(state, activeChannelId));
  const channelsMessages = messages.filter((message) => message.channelId === activeChannelId);

  return channelsMessages && (
    <>
      <div className='d-flex flex-column h-100'>
        <div className='bg-light mb-4 p-3 shadow-sm small'>
          <p className='m-0'>
            <b># {activeChannel && activeChannel.name}</b>
          </p>
          <span className='text-muted'>{t('messagesHeader.messagesCount', { count: channelsMessages.length })}</span>
        </div>
        <div id='message-box' className='chat-messages overflow-auto px-5 '>
          {channelsMessages.map(({ id, body, username }) => (
            <div className='text-break mb-2' key={id}>
              <b>{username}</b>:&nbsp;{body}
            </div>
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
