import {
  USER_LOGIN,
  LOGIN,
  LOGOUT,
} from './constants';

export function userLogin() {
  return {
    type: USER_LOGIN,
  };
}

export function login(token, username) {
  return {
    type: LOGIN,
    token,
    username,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
