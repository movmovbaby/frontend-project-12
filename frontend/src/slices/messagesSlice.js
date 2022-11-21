import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.jsx';

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
      console.log('fetchcahnnel error', error);
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
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      console.log('messages slice ACTION', action)
      messagesAdapter.addMany(state, action);
    })
  }
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messagesInfo);
export default messagesSlice.reducer; 
