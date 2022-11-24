/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import { fetchChannels, selectors, actions as channelsActions } from '../slices/channelsSlice.js';
import AddChannelModal from "./AddChannelModal";


const Channels = ({ socket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
    dispatch(channelsActions.setActiveChannel(channel.id));
  })

  const channels = useSelector(selectors.selectAll);
  const activeChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  const SimpleButton = (channel, isActive) => (
    <button
      type='button'
      className={isActive ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}
      onClick={() => dispatch(channelsActions.setActiveChannel(channel.id))}
    >
      <span className='me-1'>#</span>{channel.name}
    </button>
  )

  const RemovableButton = (channel, isActive) => (
    <Dropdown as={ButtonGroup} className='d-flex dropdown btn-group'>
      <Button
        className={isActive ? 'w-100 rounded-0 text-start text-truncate' : 'w-100 rounded-0 text-start text-truncatet'}
        onClick={() => dispatch(channelsActions.setActiveChannel(channel.id))}
        variant={isActive ? 'secondary' : 'light'}
      >
        <span className='me-1'>#</span>{channel.name}
      </Button>
      <Dropdown.Toggle split className='flex-grow-0 ' variant={isActive ? 'secondary' : 'light'}>
        <span className='visually-hidden'>Управление каналом</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Добавить</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Удалить</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown >
  )

  return channels && (
    <>
      <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
        <span>Каналы</span>
        <AddChannelModal socket={socket} />
      </div>
      <Nav variant="pills" className='flex-column nav-fill px-2' as='ul'>
        {channels.map(({ id, name, removable }) => {
          const isActive = activeChannelId === id;
          const item = removable ? RemovableButton({ id, name, removable }, isActive) : SimpleButton({ id, name, removable }, isActive);

          return (
            <Nav.Item key={id} as='li' className='w-100'>
              {item}
            </Nav.Item>
          );
        }
        )}
      </Nav>
    </>
  )
};


export default Channels;
