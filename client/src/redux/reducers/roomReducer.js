import {
  SET_ROOM, READY_ROOM, CATEGORY_ROOM, NOT_READY_ROOM, READY_ROOM_BY_CATEGORY, GET_ROOMS,

  SORTED_ROOMS,

  READY_ROOMS_FOR_CHECKIN,

} from '../types';

export default function guestReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ROOM:
      return payload;
    case READY_ROOM:
      return payload;
    case CATEGORY_ROOM:
      return payload;
    case NOT_READY_ROOM:
      return payload;
    case READY_ROOM_BY_CATEGORY:
      return payload;
    case GET_ROOMS:
      return payload;
    case SORTED_ROOMS:
      return payload;
    case READY_ROOMS_FOR_CHECKIN:
      return payload;
    default:
      return state;
  }
}
