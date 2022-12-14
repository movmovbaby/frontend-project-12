/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectors, actions as messagesActions } from '../slices/messagesSlice.js';
import MessageForm from './MessageForm.jsx';
import { selectors as channelsSelector } from '../slices/channelsSlice.js';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

const Messages = ({ socket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      const { token } = auth.userData;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.get(routes.dataPath(), config);
        const { messages } = response.data;
        dispatch(messagesActions.addMessages(messages));
      } catch (error) {
        toast.error(t('messages.error.fetching'));
      }
    };
    fetchMessages();
  }, [dispatch]);

  const messages = useSelector(selectors.selectAll);
  const activeChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const activeChannel = useSelector((state) => channelsSelector.selectById(state, activeChannelId));
  const channelsMessages = messages.filter((message) => message.channelId === activeChannelId);

  return channelsMessages && (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #&nbsp;
            {activeChannel && activeChannel.name}
          </b>
        </p>
        <span className="text-muted">{t('messagesHeader.messagesCount', { count: channelsMessages.length })}</span>
      </div>
      <div id="message-box" className="chat-messages overflow-auto px-5">
        {channelsMessages.map(({ id, body, username }) => (
          <div className="text-break mb-2" key={id}>
            <b>{username}</b>
            :&nbsp;
            {body}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageForm socket={socket} />
      </div>
    </div>
  );
};

export default Messages;
