import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

/* export const fetchMessages = createAsyncThunk(
  'channels/fetchMessages',
  async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(routes.dataPath(), config);
    return response.data.messages;
  },
); */

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.deleteChannel, (state, action) => {
        const channelId = action.payload;
        const restMessages = Object.values(state.entities).filter((e) => e.channelId !== channelId);
        messagesAdapter.setAll(state, restMessages);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messagesInfo);
export default messagesSlice.reducer;
