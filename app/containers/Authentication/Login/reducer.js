import { fromJS } from 'immutable';

import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
} from './constants';

const initialState = fromJS({
  email: '',
  password: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return state.set('email', action.value);
    case CHANGE_PASSWORD:
      return state.set('password', action.value);
    default:
      return state;
  }
}

export default homeReducer;
