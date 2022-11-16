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
    <ul>
      {channels.map(({ id, name }) => (
        <li key={id}>
          <button>{name}</button>
        </li>
      ))}
    </ul>
  )
};


export default Channels;
