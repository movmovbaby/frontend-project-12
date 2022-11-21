import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.jsx';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      const response = await axios.get(routes.dataPath(), config);
      return response.data;
    } catch (error) {
      console.log('fetchcahnnel error', error);
    }
  }
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      console.log('channel slice ACTION', action)
      state.currentChannelId = action.payload.currentChannelId;
      channelsAdapter.addMany(state, action.payload.channels);
    })
  }
});

export const selectors = channelsAdapter.getSelectors((state) => state.channelsInfo);
export default channelsSlice.reducer; 
