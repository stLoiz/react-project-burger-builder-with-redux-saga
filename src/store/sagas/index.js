import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from './auth';

export function* watchAuth() {
  // takeEvery is like a listener and will allows us to
  // listen to certain actions like here the action type AUTH_INITIATE_LOGOUT and
  // do something when this action occurs, which is the second argument of takeEvery()
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}
