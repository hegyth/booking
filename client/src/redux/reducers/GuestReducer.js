import {
  SET_GUEST, ADD_GUEST, CURRENT_GUESTS, CLEAR_GUESTS, EDIT_GUEST,
} from '../types';

export default function guestReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case SET_GUEST:
      return payload;
    case ADD_GUEST:
      return [...state, payload];
    case CURRENT_GUESTS:
      return payload;
    case CLEAR_GUESTS:
      return [];
    case EDIT_GUEST:
      return state.map((el) => (el.id === payload.id ? payload : el));
    default:
      return state;
  }
}
