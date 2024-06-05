import callApi from "../callApi";
import {
  startRequestGetMe, startRequestGetMeFail, startRequestGetMeSuccess,
  startRequestLogin, startRequestLoginFail, startRequestLoginSuccess,
  startRequestRegister, startRequestRegisterSuccess, startRequestRegisterFail,
  startRequestLogOut, startRequestLogOutSuccess, startRequestLogOutFail,
  startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail,
  startRequestUpdatePassword, startRequestUpdatePasswordSuccess, startRequestUpdatePasswordFail,
} from "../../states/modules/auth";

export const login = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `auth/login`,
    actionTypes: [startRequestLogin, startRequestLoginSuccess, startRequestLoginFail],
    variables: {
      email: data.email,
      password: data.password,
    },
    dispatch,
    getState
  })
}

export const getMe = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `auth/me`,
    actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
    variables: {},
    dispatch,
    getState
  })
}

export const register = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `auth/register`,
    actionTypes: [startRequestRegister, startRequestRegisterSuccess, startRequestRegisterFail],
    variables: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
      // address: data.address,
    },
    dispatch,
    getState
  })
}

export const Logout = () => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `auth/logout`,
    actionTypes: [startRequestLogOut, startRequestLogOutSuccess, startRequestLogOutFail],
    variables: {},
    dispatch,
    getState
  })
}

export const forgotPassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `users/forgot-password`,
    actionTypes: [startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail],
    variables: {
      email: data.email,
    },
    dispatch,
    getState
  })
}

export const updatePassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `users/update-password`,
    actionTypes: [startRequestUpdatePassword, startRequestUpdatePasswordSuccess, startRequestUpdatePasswordFail],
    variables: {
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
    params: {
      token: data.token
    },
    dispatch,
    getState
  })
}