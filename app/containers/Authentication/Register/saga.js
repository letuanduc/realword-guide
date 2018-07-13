import { call, select, takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';
import parseJwt from 'utils/parseJwt';
import { USER_LOGIN, ROOT_API } from 'containers/App/constants';
import { login } from 'containers/App/actions';
import { makeSelectEmail, makeSelectPassword, makeSelectUsername } from './selectors';

export function* getAuth() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const username = yield select(makeSelectUsername());
  const requestURL = `${ROOT_API}/users`;

  try {
    const auth = yield call(request, {
      method: 'POST',
      url: requestURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: {
        user: {
          email,
          password,
          username,
        },
      },
    });
    const info = parseJwt(auth.user.token);
    localStorage.setItem('jwtToken', auth.user.token);
    yield put(login(auth.user.token, info.username));
    yield put(push('/'));
  } catch (err) {
    console.log(err);
  }
}

export default function* authenticationData() {
  yield takeLatest(USER_LOGIN, getAuth);
}
