import axios from 'axios';
import {
  SET_GUEST, ADD_GUEST, CURRENT_GUESTS, CLEAR_GUESTS, EDIT_GUEST,
} from '../types';

export const setGuest = (payload) => ({ type: SET_GUEST, payload });
export const addGuest = (payload) => ({ type: ADD_GUEST, payload });
export const setCurrentGuest = (payload) => ({ type: CURRENT_GUESTS, payload });
export const clearGuests = () => ({ type: CLEAR_GUESTS });
export const editGuest = (payload) => ({ type: EDIT_GUEST, payload });

export const setGuestThunk = () => (dispatch) => {
  axios('/api/guest/allGuests')
    .then((res) => dispatch(setGuest(res.data)))
    .catch(console.log);
};

export const editGuestThunk = (input, id) => (dispatch) => {
  console.log(input);
  axios
    .patch(`/api/guest/patchGuests/${id}`, { input })
    .then((res) => dispatch(editGuest(res.data)))
    .catch(console.log);
};

export const setCurrentGuestThunk = () => (dispatch) => {
  axios
    .get('/api/guest/currentGuests')
    .then((res) => { dispatch(setCurrentGuest(res.data)); })
    .catch(console.log);
};
