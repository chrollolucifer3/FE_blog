import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    isLoadingTableEmployee: false,
    paginationListEmployee: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    allRole: [],

    visibleModalCreateOrUpdateEmployee: false,
    visitableModalUpdateStatusEmployee: false,
    isLoadingBtnCreateOrUpdateEmployee: false,
    isLoadingBtnUpdateStatusEmployee: false,
    visibleModalDeleteEmployee: false,
    isLoadingBtnDeleteEmployee: false,
    errorCreateOrUpdateEmployee: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
  },
  reducers: {
    setErrorCreateOrUpdateEmployee: (state, action) => ({
      ...state,
      errorCreateOrUpdateEmployee: action.payload
    }),

    //abc
    setVisibleModalCreateOrUpdateEmployee: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateEmployee: action.payload
    }),

    setVisibleModalDeleteEmployee: (state, action) => ({
      ...state,
      visibleModalDeleteEmployee: action.payload
    }),
    setVisibleModalUpdateStatusEmployee: (state, action) => ({
      ...state,
      visibleModalUpdateStatusEmployee: action.payload
    }),
    getList: (state) => ({
      ...state,
      employees: [],
      isLoadingTableEmployee: true
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableEmployee: false,
      employees: action.payload.data.users,
      paginationListEmployee: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalPage: Math.ceil(action.payload.data.total / action.payload.data.per_page),
        totalRecord: action.payload.data.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      employees: [],
      isLoadingTableEmployee: false
    }),
    getAllRole: (state) => ({...state}),
    getAllRoleSuccess: (state, action) => ({
      ...state,
      allRole: action.payload.data,
    }),
    getAllRoleFail: (state) => ({...state}),
    createEmployee: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: true,
    }),
    createEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false
    }),
    createEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false,
    }),
    updateEmployee: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: true
    }),
    updateEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false
    }),
    updateEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false
    }),
    deleteEmployee: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: true
    }),
    deleteEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: false
    }),
    deleteEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: false
    }),
    updateStatusEmployee: (state) => ({
      ...state,
      isLoadingBtnUpdateStatusEmployee: true
    }),
    updateStatusEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateStatusEmployee: false
    }),
    updateStatusEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnUpdateStatusEmployee: false
    }),
  }
})

export const {
  setErrorCreateOrUpdateEmployee,
  setVisibleModalDeleteEmployee,
  setVisibleModalCreateOrUpdateEmployee,
  setVisibleModalUpdateStatusEmployee,
  getList, getListSuccess, getListFail,
  getAllRole, getAllRoleSuccess, getAllRoleFail,
  createEmployee, createEmployeeSuccess, createEmployeeFail,
  updateEmployee, updateEmployeeSuccess, updateEmployeeFail,
  deleteEmployee, deleteEmployeeSuccess, deleteEmployeeFail,
  updateStatusEmployee, updateStatusEmployeeSuccess, updateStatusEmployeeFail
} = employeeSlice.actions

export default employeeSlice.reducer;
