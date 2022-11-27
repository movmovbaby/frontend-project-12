/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modalInfo',
  initialState: {
    isOpened: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal(state, action) {
      const { type, extra } = action.payload;
      state.type = type;
      state.extra = extra;
      state.isOpened = true;
    },
    closeModal(state) {
      state.type = null;
      state.isOpened = null;
      state.extra = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
