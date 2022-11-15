import { configureStore } from '@reduxjs/toolkit';


export default configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
  }
});
