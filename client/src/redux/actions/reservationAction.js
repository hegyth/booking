import axios from 'axios';
import {
  SET_RESERVATION, ADD_RESERVATION, REMOVE_RESERVATION, SET_TODAY_RESERVATION, SET_DATE_RESERVATION,
  CHECKIN_RESERVATION, ACTIVE_RESERVATION, PAST_RESERVATION, CLOSE_RESERVATION,
} from '../types';

export const setReservation = (payload) => ({ type: SET_RESERVATION, payload });
export const addReservation = (payload) => ({ type: ADD_RESERVATION, payload });
export const removeReservation = (payload) => ({ type: REMOVE_RESERVATION, payload });
export const todayResrvation = (payload) => ({ type: SET_TODAY_RESERVATION, payload });
export const dateReservation = (payload) => ({ type: SET_DATE_RESERVATION, payload });
export const checkinReservation = (payload) => ({ type: CHECKIN_RESERVATION, payload });
export const activeReservation = (payload) => ({ type: ACTIVE_RESERVATION, payload });
export const pastReservation = (payload) => ({ type: PAST_RESERVATION, payload });
export const closeReservation = (payload) => ({ type: CLOSE_RESERVATION, payload });

export const setReservationThunk = () => (dispatch) => {
  axios('/api/reserv/allReservation')
    .then((res) => dispatch(setReservation(res.data)))
    .catch(console.log);
};

export const setTodayReservationThunk = () => (dispatch) => {
  axios('/api/reserv/todayReservation')
    .then((res) => dispatch(todayResrvation(res.data)))
    .catch(console.log);
};

export const setDateReservationThunk = (input) => (dispatch) => {
  axios.post('/api/reserv/checkDate', { input })
    .then((res) => dispatch(dateReservation(res.data)))
    .catch(console.log);
};

export const addReservationThunk = (input) => (dispatch) => {
  axios
    .put('/api/reserv/newReservation', { input })
    .then((res) => {
      console.log(res.data);
      dispatch(addReservation(res.data));
    })
    .catch(console.log);
};

export const removeReservationThunk = (id) => (dispatch) => {
  console.log('ID', { id });
  axios
    .delete(`/api/reserv/deleteReservation/${id}`)
    .then((res) => dispatch(removeReservation(res.data.newReservation)))
    .catch(console.log);
};

export const checkinReservationThunk = (id, selectedRoom) => (dispatch) => {
  console.log(id, selectedRoom);
  axios
    .patch(`/api/reserv/checkinReservation/${id}`, { selectedRoom })
    .then(() => dispatch(checkinReservation(id)))
    .catch(console.log);
};

export const activeReservationThunk = () => (dispatch) => {
  axios
    .get('/api/reserv/activeReservation')
    .then((res) => dispatch(activeReservation(res.data)))
    .catch(console.log);
};

export const pastReservationThunk = () => (dispatch) => {
  axios
    .get('/api/reserv/pastReservation')
    .then((res) => dispatch(pastReservation(res.data)))
    .catch(console.log);
};

export const closeReservationThunk = (id) => (dispatch) => {
  axios
    .patch(`/api/reserv/closeReservation/${id}`)
    .then(() => dispatch(closeReservation(id)))
    .catch(console.log);
};
