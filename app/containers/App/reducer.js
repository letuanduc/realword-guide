import { fromJS } from 'immutable';

import {
  LOGIN,
  LOGOUT,
} from './constants';

const initialState = fromJS({
  user: {
    username: false,
    jwtToken: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state
        .setIn(['user', 'username'], action.username)
        .setIn(['user', 'jwtToken'], action.token);
    case LOGOUT:
      return state
        .setIn(['user', 'username'], false)
        .setIn(['user', 'jwtToken'], false);
    default:
      return state;
  }
}

export default appReducer;
