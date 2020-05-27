import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

// this is a generator function
export function* logoutSaga(action) {
  // the yield keyword means that each step will be executed and wait until it is finished in order to proceed with the next one
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  // put is going to dispatch a new action
  yield put({
    type: actionTypes.AUTH_LOGOUT,
  });
}
