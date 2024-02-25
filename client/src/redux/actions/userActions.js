import axios from 'axios';
import {
  SET_AUTH, LOGOUT,
} from '../types';

export const setAuthUser = (payload) => ({ type: SET_AUTH, payload });
export const logoutUser = () => ({ type: LOGOUT });

export const checkAuth = () => (dispatch) => {
  axios.post('/api/user/check')
    .then((res) => dispatch(setAuthUser(res.data)))
    .catch(console.log);
};

export const loginUser = (inputs) => (dispatch) => {
  axios.post('/api/user/login', inputs)
    .then((res) => {
      dispatch(setAuthUser(res.data));
    })
    .catch(console.log);
};

export const logoutUserAsync = () => (dispatch) => {
  axios('/api/user/logout')
    .then(() => dispatch(logoutUser()))
    .catch(console.log);
};
