import {
  all, fork, takeLatest, put
} from "redux-saga/effects";
import {
  startRequestLoginSuccess,
  startRequestRegisterFail,
  startRequestRegisterSuccess,
  // startRequestLogOutSuccess,
  startRequestForgotPasswordSuccess,
  startRequestForgotPasswordFail,
  startRequestLoginFail,
  startRequestUpdatePassword,
  setErrorLogin,
  setErrorRegister
} from "./index";
import { setAuthToken } from "../../../utils/localStorage";
import { getMe } from "../../../api/auth";
import { setLocation } from "../app";
import { getNotification } from "../../../utils/helper";
import _ from "lodash";

function* loadRouteData() {
  //
}

function* handleActions() {
  yield takeLatest(startRequestLoginSuccess, function* (action) {
    let token = action.payload.data.access_token;
    setAuthToken(token);
    yield put(getMe());
  });

  yield takeLatest(startRequestLoginFail, function* (action) {
    let statusError = action.payload.status;
    if (statusError === 400) {
      let errors = action.payload.data.detail;
      yield put(setErrorLogin({
        email: _.get(errors, 'email', ''),
        password: _.get(errors, 'password', ''),
      }));
      errors && getNotification('error', 'Login Fail');
    } else if (statusError === 401) {
      getNotification('error', action.payload.data.message);
    } else {
      getNotification('error', 'Server error');
    }
  });

  yield takeLatest(startRequestRegisterSuccess, function* () {
    getNotification('success', 'Register success');
    yield put(setLocation({ pathName: '/login' }));
  });

  yield takeLatest(startRequestRegisterFail, function* (action) {
    let statusError = action.payload.status;
    if (statusError === 400) {
      let errors = action.payload.data.detail;
      yield put(setErrorRegister({
        name: _.get(errors, 'name', ''),
        email: _.get(errors, 'email', ''),
        phone: _.get(errors, 'phone', ''),
        password: _.get(errors, 'password', ''),
        confirmPassword: _.get(errors, 'confirmPassword', ''),
      }));
      errors && getNotification('error', 'Register Fail');
    } else if (statusError === 401) {
      getNotification('error', action.payload.data.message);
    } else {
      getNotification('error', 'Server error');
    }
  });

  // yield takeLatest(startRequestLogOutSuccess, function* () {
  //   yield put(setLocation({ pathName: '/login' }));
  // });

  yield takeLatest(startRequestForgotPasswordSuccess, function () {
    getNotification('success', 'Please check your email');
    // yield put(setLocation({ pathName: '/check-mail' }));
  });

  yield takeLatest(startRequestForgotPasswordFail, function* (action) {
    let statusError = action.payload.status;
    if (statusError === 404) {
      let error = action.payload.data.message;

      error && getNotification('error', action.payload.data.message, 5000);
    } else if (statusError === 401) {
      getNotification('error', action.payload.data.message, 5000);
    } else {
      getNotification('error', 'Server error');
    }
    yield put(setLocation({ pathName: '/forgot-password' }));
  });

  yield takeLatest(startRequestUpdatePassword, function* () {
    getNotification('success', 'Update password success');
    yield put(setLocation({ pathName: '/login' }));
  });
}

export default function* loadAuthSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
