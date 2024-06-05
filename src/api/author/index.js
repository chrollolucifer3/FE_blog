import callApi from "../callApi";
import {
    startRequestGetAuthorList,
    startRequestGetAuthorListSuccess,
    startRequestGetAuthorListFail,
} from "../../states/modules/author/index";

export const getAuthorList = (dataFilter = {
    perPage: 10,
    page: 1
}) => async (dispatch, getState) => {
    let path = `authors?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
        path += `&q=${dataFilter.keySearch}`;
    }

    if (dataFilter.order && dataFilter.column) {
        path += `&order=${dataFilter.order}&column=${dataFilter.column}`;
    }
    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [
            startRequestGetAuthorList,
            startRequestGetAuthorListSuccess,
            startRequestGetAuthorListFail
        ],
        variables: {},
        dispatch,
        getState
    })
}