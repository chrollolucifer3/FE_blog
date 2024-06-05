import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    errorInfoUser: {
      name: '',
      email: '',
      phone: ''
    },
    loadingBtnUpdateInfoUser: false,
    errorChangePassword: {
      currentPassword: '',
      password: '',
      confirmPassword: ''
    },
    loadingBtnChangePassword: false,
    loadingBtnUpdateAvatar: false,
    visibleModalUpdateAvatar: false,
  },
  reducers: {
    setErrorInfoUser: (state, action) => ({
      ...state,
      errorInfoUser: action.payload
    }),
    setErrorChangePassword: (state, action) => ({
      ...state,
      errorChangePassword: action.payload
    }),
    setVisibleModalUpdateAvatar: (state, action) => ({
      ...state,
      visibleModalUpdateAvatar: action.payload
    }),
    updateInfoUser: (state) => ({
      ...state,
      loadingBtnUpdateInfoUser: true
    }),
    updateInfoUserSuccess: (state) => ({
      ...state,
      loadingBtnUpdateInfoUser: false
    }),
    updateInfoUserFail: (state) => ({
      ...state,
      loadingBtnUpdateInfoUser: false
    }),
    changePassword: (state) => ({
      ...state,
      loadingBtnChangePassword: true
    }),
    changePasswordSuccess: (state) => ({
      ...state,
      loadingBtnChangePassword: false
    }),
    changePasswordFail: (state) => ({
      ...state,
      loadingBtnChangePassword: false
    }),
    updateAvatarUser: (state) => ({
      ...state,
      loadingBtnUpdateAvatar: true
    }),
    updateAvatarUserSuccess: (state) => ({
      ...state,
      loadingBtnUpdateAvatar: false
    }),
    updateAvatarUserFail: (state) => ({
      ...state,
      loadingBtnUpdateAvatar: false
    })
  }
})

export const {
  setErrorInfoUser,
  setErrorChangePassword,
  updateInfoUser, updateInfoUserSuccess, updateInfoUserFail,
  changePassword, changePasswordSuccess, changePasswordFail,
  setVisibleModalUpdateAvatar,
  updateAvatarUser, updateAvatarUserSuccess, updateAvatarUserFail
} = profileSlice.actions

export default profileSlice.reducer;
