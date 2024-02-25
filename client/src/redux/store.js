import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/UserReducer';
import guestReducer from './reducers/GuestReducer';
import reservationReducer from './reducers/ReservationReducer';
import guestModalSlice from './slices/guestModalSlice';
import reservationModalSlice from './slices/reservationModalSlice';
import roomReducer from './reducers/roomReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    guests: guestReducer,
    rooms: roomReducer,
    reservation: reservationReducer,
    guestModal: guestModalSlice,
    reservationModal: reservationModalSlice,
  },
});
