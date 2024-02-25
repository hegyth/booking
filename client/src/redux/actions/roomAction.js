import axios from 'axios';
import {
  SET_ROOM, READY_ROOM, CATEGORY_ROOM, NOT_READY_ROOM, READY_ROOM_BY_CATEGORY, GET_ROOMS,
  SORTED_ROOMS,
  READY_ROOMS_FOR_CHECKIN,
} from '../types';

export const setRoom = (payload) => ({ type: SET_ROOM, payload });
export const readyRoom = (payload) => ({ type: READY_ROOM, payload });
export const categoryRoom = (payload) => ({ type: CATEGORY_ROOM, payload });
export const notReadyRoom = (payload) => ({ type: NOT_READY_ROOM, payload });
export const readyRoomByCategory = (payload) => ({ type: READY_ROOM_BY_CATEGORY, payload });
export const getRooms = (payload) => ({ type: GET_ROOMS, payload });

export const sortedRooms = (payload) => ({ type: SORTED_ROOMS, payload });
export const readyForCheckIN = (payload) => ({ type: READY_ROOMS_FOR_CHECKIN, payload });

export const setRoomThunk = () => (dispatch) => {
  axios('/api/room/listRooms')
    .then((res) => dispatch(setRoom(res.data)))
    .catch(console.log);
};

export const readyRoomThunk = () => (dispatch) => {
  axios('/api/room/listRooms/ready')
    .then((res) => dispatch(readyRoom(res.data)))
    .catch(console.log);
};

export const categoryRoomThunk = (category) => (dispatch) => {
  axios
    .post('/api/room/listRooms/cathegory', { category })
    .then((res) => dispatch(categoryRoom(res.data)))
    .catch(console.log);
};

export const notreadyRoomThunk = () => (dispatch) => {
  axios('/api/room/listRooms/notready')
    .then((res) => dispatch(notReadyRoom(res.data)))
    .catch(console.log);
};

export const readyRoomByCategoryThunk = (category) => (dispatch) => {
  axios
    .get(`/api/room/listRooms/readyBy/${category}`)
    .then((res) => dispatch(readyRoomByCategory(res.data)))
    .catch(console.log);
};

export const getRoomsThunk = (arr) => (dispatch) => {
  axios
    .post('/api/room/listRooms/filter', { arr })
    .then((res) => dispatch(getRooms(res.data)))
    .catch(console.log);
};

export const sortedRoomsThunk = ({ ready, catArr }) => (dispatch) => {
  axios
    .post('/api/room/sortedRooms', { catArr, ready })
    .then((res) => dispatch(sortedRooms(res.data)))
    .catch(console.log);
};
export const readyRoomsForCheckInThunk = ({ checkIN, checkOut }) => (dispatch) => {
  axios
    .post('/api/room/listRooms/readycheckin', { checkIN, checkOut })
    .then((res) => dispatch(readyRoom(res.data)))
    .catch(console.log());
};
