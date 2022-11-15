import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '.../routes.js';

const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await axios.get(routes.dataPath(),
      {
        headers:
        {
          'Authorization': `Bearer: ${localStorage.getItem('token')}`
        }
      });
    return response.data.channels;
  }
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {},
  extraReducers: (builder) => {
    builder
    addCase(fetchChannels.fulfilled, (state, action) => {
      chanelsAdapter.addMany(state, action);
    })
  }
})

export const selectors = channelsAdapter.getSelectors((state) => state.tasks);
export default cahnnelsSlice.reducer; 
