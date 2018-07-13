import { fromJS } from 'immutable';
import { CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_USERNAME } from './constants';

const initialState = fromJS({
  username: false,
  password: false,
  email: false,
});

export default function homeReducer(state = initialState, actions) {
  switch (actions.type) {
    case CHANGE_EMAIL:
      return state
        .set('email', actions.email);
    case CHANGE_PASSWORD:
      return state
        .set('password', actions.password);
    case CHANGE_USERNAME:
      return state
        .set('username', actions.username);
    default:
      return state;
  }
}
