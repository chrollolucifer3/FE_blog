import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthSuccess: false,
    authUser: {},
    errorRegister: {
      name: '',
      email: '',
      phone: '',
      // address: '',
      password: '',
      confirmPassword: ''
    },
    loginError: {
      email: '',
      phone: '',
    }, // Thêm trạng thái lưu trữ thông báo lỗi khi đăng nhập
    isLoadingBtnLogin: false,
    isLoadingBtnRegister: false,
    isLoadingBtnLogout: false,
    isLoadingBtnForgotPassword: false,
    isLoadingBtnUpdatePassword: false,
  },
  reducers: {
    setErrorLogin: (state, action) => ({
      ...state,
      loginError: action.payload
    }),
    setErrorRegister: (state, action) => ({
      ...state,
      errorRegister: action.payload
    }),
    startRequestLogin: (state) => ({
      ...state,
      isLoadingBtnLogin: true,
    }),
    startRequestLoginSuccess: (state) => ({
      ...state,
      isLoadingBtnLogin: false
    }),
    startRequestLoginFail: (state) => ({
      ...state,
      isLoadingBtnLogin: false,
    }),
    startRequestGetMe: (state) => ({
      ...state,
    }),
    startRequestGetMeSuccess: (state, action) => ({
      ...state,
      isAuthSuccess: true,
      authUser: action.payload.data
    }),
    startRequestGetMeFail: (state) => ({
      ...state,
      isAuthSuccess: false,
      authUser: {}
    }),
    startRequestRegister: (state) => ({
      ...state,
      isLoadingBtnRegister: true,
    }),
    startRequestRegisterSuccess: (state) => ({
      ...state,
      isLoadingBtnRegister: false
    }),
    startRequestRegisterFail: (state) => ({
      ...state,
      isLoadingBtnRegister: false,
    }),
    startRequestLogOut: (state) => ({
      ...state,
      isLoadingBtnLogout: true
    }),
    startRequestLogOutSuccess: (state) => ({
      ...state,
      isLoadingBtnLogout: false,
      isAuthSuccess: false,
      authUser: {}
    }),
    startRequestLogOutFail: (state) => ({
      ...state,
      isLoadingBtnLogout: false
    }),
    startRequestForgotPassword: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: true
    }),
    startRequestForgotPasswordSuccess: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: false
    }),
    startRequestForgotPasswordFail: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: false
    }),
    startRequestUpdatePassword: (state) => ({
      ...state,
      isLoadingBtnUpdatePassword: true
    }),
    startRequestUpdatePasswordSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdatePassword: false
    }),
    startRequestUpdatePasswordFail: (state) => ({
      ...state,
      isLoadingBtnUpdatePassword: false
    }),
  }
})

export const {
  startRequestLogin, startRequestLoginSuccess, startRequestLoginFail,
  startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail,
  startRequestRegister, startRequestRegisterSuccess, startRequestRegisterFail,
  startRequestLogOut, startRequestLogOutSuccess, startRequestLogOutFail,
  startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail,
  startRequestUpdatePassword, startRequestUpdatePasswordSuccess, startRequestUpdatePasswordFail,
  setErrorLogin,
  setErrorRegister
} = authSlice.actions

export default authSlice.reducer;
