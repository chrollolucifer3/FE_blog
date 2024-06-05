import axios from "axios";
import {isFunction} from 'lodash';
import { getAuthToken } from "../utils/localStorage";

export default async function callApi ({
  method,
  apiPath,
  actionTypes: [requestType, successType, failureType],
  variables,
  params, // Thêm params vào để truyền vào url
  dispatch,
  getState,
  headers
}) {
  if (!isFunction(dispatch) || !isFunction(getState)) {
    throw new Error('callGraphQLApi requires dispatch and getState functions');
  }

  // const baseUrlApi = process.env.REACT_APP_API_URL;
  const baseUrlApi = "http://localhost:3456";
  const token = getAuthToken();
  const header = {
    // "Content-Type": "application/json",
    // "Content-Type": "Form-data",
    "Authorization": token ? `Bearer ${token}` : ""
  };
  dispatch(requestType())
  return axios({
    baseURL: baseUrlApi,
    headers: headers ? {...headers, ...header} : header,
    method: method,
    url: apiPath,
    data: variables,
    // params: method === 'get' ? variables : '' 
    params: method === 'get' ? variables : params // Nếu method là get thì truyền vào params, còn không thì truyền vào data

  })
  .then(function (response) {
    dispatch(successType(response.data))
    return response.data;
  })
  .catch((error) => {
    let response = error.response ? error.response : error;
    dispatch(failureType(error.response));
    return response
  })
}
