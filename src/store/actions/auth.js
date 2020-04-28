import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    console.log(process.env.REACT_APP_FIREBASE_SIGN_UP_URL);
    let url = process.env.REACT_APP_FIREBASE_SIGN_UP_URL;

    if (!isSignup) {
      url = process.env.REACT_APP_FIREBASE_SIGN_IN_URL;
    }

    axios
      .post(url, authData)
      .then((res) => {
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
