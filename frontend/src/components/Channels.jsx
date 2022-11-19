/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchChannels, selectors } from '../slices/channelsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, []);

  const channels = useSelector(selectors.selectAll);

  return channels && (
    <>
      <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
        <span>Каналы</span>
      </div>
      <ul className='nav flex-column nav-pills nav-fill px-2'>
        {channels.map(({ id, name }) => (
          <li key={id} className='nav-item w-100'>
            <button type='button' className='w-100 rounded-0 text-start btn'>
              <span className='me-1'>#</span>{name}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
};


export default Channels;
