import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const reservationModalSlice = createSlice({
  name: 'reservationModalSlice',
  initialState,
  reducers: {
    setReservModal(state, action) {
      return action.payload;
    },
  },
});

export const { setReservModal } = reservationModalSlice.actions;
export default reservationModalSlice.reducer;
