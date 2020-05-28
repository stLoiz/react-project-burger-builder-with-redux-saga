import axios from 'axios';
import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import * as actions from '../actions';
// this is a generator function
export function* logoutSaga(action) {
  // the yield keyword means that each step will be executed and wait until it is finished in order to proceed with the next one
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  // put is going to dispatch a new action
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  let url = process.env.REACT_APP_FIREBASE_SIGN_UP_URL;

  if (!action.isSignup) {
    url = process.env.REACT_APP_FIREBASE_SIGN_IN_URL;
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000,
    );
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId),
    );
    yield put(actions.checkAuthTimeOut(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}
