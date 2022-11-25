import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.jsx';
import { actions as channelsActions } from './channelsSlice.js';

export const fetchMessages = createAsyncThunk(
  'channels/fetchMessages',
  async () => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      const response = await axios.get(routes.dataPath(), config);
      return response.data.messages;
    } catch (error) {
      console.log('fetch messages error', error);
    }
  }
);

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action);
      })
      .addCase(channelsActions.deleteChannel, (state, action) => {
        const channelId = action.payload;
        const restMessages = Object.values(state.entities).filter((e) => e.channelId !== channelId);
        messagesAdapter.setAll(state, restMessages);
      })
  }
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messagesInfo);
export default messagesSlice.reducer; 
