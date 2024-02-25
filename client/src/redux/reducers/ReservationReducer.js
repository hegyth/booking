import {
  SET_RESERVATION, ADD_RESERVATION, REMOVE_RESERVATION, SET_TODAY_RESERVATION,
  SET_DATE_RESERVATION, CHECKIN_RESERVATION, ACTIVE_RESERVATION, PAST_RESERVATION,
  CLOSE_RESERVATION,
} from '../types';

export default function reservationReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case SET_RESERVATION:
      return payload;
    case SET_TODAY_RESERVATION:
      return payload;
    case SET_DATE_RESERVATION:
      return payload;
    case ADD_RESERVATION:
      return [...state, payload.newReservation[0]];
    case REMOVE_RESERVATION:
      return payload;
    case CHECKIN_RESERVATION:
      return payload?.filter((el) => el.id !== payload);
    case ACTIVE_RESERVATION:
      return payload;
    case PAST_RESERVATION:
      return payload;
    case CLOSE_RESERVATION:
      return state?.filter((el) => el.id !== payload);

    default:
      return state;
  }
}
