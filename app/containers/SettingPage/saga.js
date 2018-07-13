import { call, select, takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';
import { ROOT_API } from 'containers/App/constants';
import { makeGetLogin } from '../App/selectors';
import { makeGetImge, makeGetUsername, makeGetBio, makeGetEmail, makeGetPassword } from './selectors';
import { loadInfo } from './actions';
import { GET_INFO, UPDATE_USER } from './constants';

export function* getCurrentUser() {
  const token = yield select(makeGetLogin());
  if (token) {
    const requestURL = `${ROOT_API}/user`;
    try {
      const info = yield call(request, {
        url: requestURL,
        headers: {
          Authorization: `Token ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      localStorage.setItem('jwtToken', info.user.token);
      yield put(loadInfo(info.user));
    } catch (error) {
      console.log(error);
    }
  }
}

function* updateInfo() {
  const token = yield select(makeGetLogin());
  if (token) {
    const requestURL = `${ROOT_API}/user`;
    const newPassword = yield select(makeGetPassword());
    const email = yield select(makeGetEmail());
    const username = yield select(makeGetUsername());
    const image = yield select(makeGetImge());
    const bio = yield select(makeGetBio());
    let user = {
      email,
      username,
      image,
      bio,
    };
    if (newPassword) {
      user = {
        ...user,
        password: newPassword,
      };
    }
    try {
      const changeRequest = yield call(request, {
        method: 'put',
        url: requestURL,
        headers: {
          Authorization: `Token ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: user,
      });
      localStorage.setItem('jwtToken', changeRequest.user.token);
      localStorage.setItem('userImage', changeRequest.user.image);
      yield put(push(`/@${changeRequest.user.username}`));
    } catch (error) {
      console.log(error);
    }
  }
}

export default function* apiDate() {
  yield takeLatest(GET_INFO, getCurrentUser);
  yield takeLatest(UPDATE_USER, updateInfo);
}
