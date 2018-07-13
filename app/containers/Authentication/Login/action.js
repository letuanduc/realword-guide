import { CHANGE_EMAIL, CHANGE_PASSWORD } from './constants';

export function changeEmail(value) {
  return {
    type: CHANGE_EMAIL,
    value,
  };
}

export function changePassword(value) {
  return {
    type: CHANGE_PASSWORD,
    value,
  };
}
