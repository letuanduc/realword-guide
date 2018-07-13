import { fromJS } from 'immutable';
import {
  CHANGE_IMAGE,
  CHANGE_USERNAME,
  CHANGE_BIO,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  LOAD_INFO,
} from './constants';

const initialState = fromJS({
  image: false,
  username: false,
  bio: false,
  email: false,
  password: false,
});

export default function homeState(state = initialState, actions) {
  switch (actions.type) {
    case CHANGE_IMAGE:
      return state
        .set('image', actions.image);
    case CHANGE_USERNAME:
      return state
        .set('username', actions.username);
    case CHANGE_BIO:
      return state
        .set('bio', actions.bio);
    case CHANGE_EMAIL:
      return state
        .set('email', actions.email);
    case CHANGE_PASSWORD:
      return state
        .set('password', actions.password);
    case LOAD_INFO:
      return state
        .set('image', actions.user.image)
        .set('username', actions.user.username)
        .set('bio', actions.user.bio)
        .set('email', actions.user.email);
    default:
      return state;
  }
}
