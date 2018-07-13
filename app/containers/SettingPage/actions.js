import {
  CHANGE_IMAGE,
  CHANGE_USERNAME,
  CHANGE_BIO,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  GET_INFO,
  LOAD_INFO,
  UPDATE_USER,
} from './constants';

export function changeImage(image) {
  return {
    type: CHANGE_IMAGE,
    image,
  };
}

export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function changeBio(bio) {
  return {
    type: CHANGE_BIO,
    bio,
  };
}

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function loadInfo(user) {
  return {
    type: LOAD_INFO,
    user,
  };
}

export function getInfo() {
  return {
    type: GET_INFO,
  };
}

export function updateUser() {
  return {
    type: UPDATE_USER,
  };
}
