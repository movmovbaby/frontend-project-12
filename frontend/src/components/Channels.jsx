/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChannels, selectors, actions as channelsActions } from '../slices/channelsSlice.js';
import AddChannelModal from "./AddChannelModal";

const Channels = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  const channels = useSelector(selectors.selectAll);
  const activeChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  return channels && (
    <>
      <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
        <span>Каналы</span>
        <AddChannelModal />
      </div>
      <ul className='nav flex-column nav-pills nav-fill px-2'>
        {channels.map(({ id, name }) => (
          <li key={id} className='nav-item w-100'>
            <button
              type='button'
              className={activeChannelId === id ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}
              onClick={() => dispatch(channelsActions.setActiveChannel(id))}
            >
              <span className='me-1'>#</span>{name}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
};


export default Channels;
