/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/index.jsx';
import {
  selectors,
  selectChannelsError,
  actions as channelsActions,
} from '../slices/channelsSlice.js';
import { actions as modalActions } from '../slices/modalSlice.js';
import routes from '../routes.js';

const SimpleButton = (props) => {
  const { channel, isActive } = props;
  const dispatch = useDispatch();
  const { id, name } = channel;

  return (
    <button
      type="button"
      className={isActive ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}
      onClick={() => dispatch(channelsActions.setActiveChannel(id))}
    >
      <span className="me-1">#</span>
      {name}
    </button>
  );
};

const RemovableButton = (props) => {
  const { channel, isActive } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id, name } = channel;

  return (
    <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
      <Button
        className={isActive ? 'w-100 rounded-0 text-start text-truncate' : 'w-100 rounded-0 text-start text-truncate'}
        onClick={() => dispatch(channelsActions.setActiveChannel(id))}
        variant={isActive ? 'secondary' : 'light'}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle split className="flex-grow-0" variant={isActive ? 'secondary' : 'light'}>
        <span className="visually-hidden">{t('channels.manage')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => dispatch(modalActions.openModal({ type: 'deleteChannel', extra: { channelId: id } }))}
        >
          {t('channels.dropDownItem.delete')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => dispatch(modalActions.openModal({ type: 'renameChannel', extra: { channelId: id } }))}
        >
          {t('channels.dropDownItem.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const activeChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const channelsError = useSelector(selectChannelsError);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (channelsError) {
      toast.error(t('channels.loadingError'));
    }
  }, [channelsError]);

  useEffect(() => {
    const fetchChannels = async () => {
      const { token } = auth.userData;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.get(routes.dataPath(), config);
        const { channels, currentChannelId } = response.data;
        dispatch(channelsActions.addChannels(channels));
        dispatch(channelsActions.setActiveChannel(currentChannelId));
      } catch (error) {
        const { status } = error.response;
        if (status === 401) {
          toast.error(t('channels.error.unautorized'));
          setTimeout(() => navigate('/login'), 6000);
        }
        toast.error(t('channels.error.fetching'));
      }
    };
    fetchChannels();
  }, [dispatch]);

  const channels = useSelector(selectors.selectAll);

  return channels && (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.title')}</span>
        <Button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          variant="btn-primary-outline"
          onClick={() => dispatch(modalActions.openModal({ type: 'addChannel', extra: null }))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav variant="pills" className="flex-column nav-fill px-2" as="ul">
        {channels.map(({ id, name, removable }) => {
          const isActive = activeChannelId === id;
          const item = removable
            ? <RemovableButton channel={{ id, name, removable }} isActive={isActive} />
            : <SimpleButton channel={{ id, name, removable }} isActive={isActive} />;

          return (
            <Nav.Item key={id} as="li" className="w-100">
              {item}
            </Nav.Item>
          );
        })}
      </Nav>
    </>
  );
};

export default Channels;
