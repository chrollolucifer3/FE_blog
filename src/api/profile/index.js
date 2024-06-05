import callApi from "../callApi";
import {
  changePassword, changePasswordFail, changePasswordSuccess,
  updateInfoUser, updateInfoUserFail, updateInfoUserSuccess,
  updateAvatarUser, updateAvatarUserFail, updateAvatarUserSuccess
} from "../../states/modules/profile";

export const handleUpdateInfoUser = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `auth/me`,
    actionTypes: [updateInfoUser, updateInfoUserSuccess, updateInfoUserFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleChangePassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `auth/change-password`,
    actionTypes: [changePassword, changePasswordSuccess, changePasswordFail],
    variables: data,
    dispatch,
    getState
  })
}

export const updateAvatarInfo = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `auth/me`,
    actionTypes: [updateAvatarUser, updateAvatarUserSuccess, updateAvatarUserFail],
    variables: data,
    dispatch,
    getState
  })
}
