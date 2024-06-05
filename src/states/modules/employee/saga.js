import {
  all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {setTitlePage} from "../app";
import {
  getAllRoleForEmployee,
  getListEmployee
} from "../../../api/employee";
import {
  setErrorCreateOrUpdateEmployee,
  setVisibleModalCreateOrUpdateEmployee,
  setVisibleModalDeleteEmployee,
  setVisibleModalUpdateStatusEmployee,
  createEmployeeFail, createEmployeeSuccess,
  updateEmployeeFail, updateEmployeeSuccess,
  deleteEmployeeFail, deleteEmployeeSuccess,
  updateStatusEmployeeSuccess, updateStatusEmployeeFail,
} from "./index";
import {getNotification} from "../../../utils/helper";
import _ from "lodash";

function* loadRouteData () {
  yield put(setTitlePage('User Management'));
  yield put(getListEmployee());
  yield put(getAllRoleForEmployee());
}

function* handleActions () {
  yield takeLatest(createEmployeeSuccess, function* () {
    getNotification('success', 'Create employee success');
    yield put(setVisibleModalCreateOrUpdateEmployee(false));
    yield put(getListEmployee());
  });

  yield takeLatest(createEmployeeFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(setErrorCreateOrUpdateEmployee({
        name: _.get(errors, 'name', ''),
        email: _.get(errors, 'email', ''),
        phone: _.get(errors, 'phone', ''),
        password: _.get(errors, 'password', ''),
      }));
    }
    getNotification('error', 'Create employee fail');
  });

  yield takeLatest(updateEmployeeSuccess, function* () {
    getNotification('success', 'Update employee success');
    yield put(setVisibleModalCreateOrUpdateEmployee(false));
    yield put(getListEmployee());
  });

  yield takeLatest(updateEmployeeFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(setErrorCreateOrUpdateEmployee({
        name: _.get(errors, 'name', ''),
        email: _.get(errors, 'email', ''),
        phone: _.get(errors, 'phone', ''),
      }));
    }
    getNotification('error', 'Update employee fail');
  });


  yield takeLatest(deleteEmployeeSuccess, function* () {
    getNotification('success', 'Delete employee success');
    yield put(setVisibleModalDeleteEmployee(false));
    yield put(getListEmployee());
  });

  yield takeLatest(deleteEmployeeFail, function* () {
    yield call(getNotification, 'error', 'Failed to delete employee.');
  });

  yield takeLatest(updateStatusEmployeeSuccess, function* () {
    getNotification('success', 'Update status employee success');
    yield put(setVisibleModalUpdateStatusEmployee(false));
    yield put(getListEmployee());
  });

  yield takeLatest(updateStatusEmployeeFail, function* () {
    yield call(getNotification, 'error', 'Failed to update status employee.');
  });

}

export default function* loadEmployeeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
