import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const guestModalSlice = createSlice({
  name: 'guestModalSlice',
  initialState,
  reducers: {
    setModal(state, action) {
      return action.payload;
    },
  },
});

export const { setModal } = guestModalSlice.actions;
export default guestModalSlice.reducer;
