import {
    // all, fork, takeLatest, put
    all, fork, put
} from "redux-saga/effects";
import {setTitlePage} from "../app";
import { getAuthorList } from "api/author";


function* loadRouteData () {
    yield put(setTitlePage('Author Management'));
    yield put(getAuthorList());
  }

function* handleActions() {
}


export default function* loadAuthorSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
