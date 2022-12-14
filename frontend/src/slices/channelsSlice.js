/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    updateChannel: channelsAdapter.updateOne,
    setActiveChannel(state, action) {
      state.currentChannelId = action.payload;
    },
    deleteChannel: (state, action) => {
      channelsAdapter.removeOne(state, action.payload);
    },
  },
});

export const { actions } = channelsSlice;
export const selectChannelsError = (state) => state.channelsInfo.error;
export const selectors = channelsAdapter.getSelectors((state) => state.channelsInfo);
export default channelsSlice.reducer;
