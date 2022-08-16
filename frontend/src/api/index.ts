import axios from "axios";

import { HOOL_API_ENDPOINT } from "constant";

const apiInstance = (baseURL = HOOL_API_ENDPOINT) => {
  const api = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });
  return api;
};

const api = apiInstance();

const setApiHeaders = (accessToken?: string) => {
  api.defaults.headers.common["Authorization"] = accessToken
    ? `Bearer ${accessToken}`
    : false;
};

const getRequest = async (path: string, obj?: object) => {
  return await api.get(path, obj).then((res) => res.data);
};
const postRequest = async (path: string, obj: object, opt?: object) => {
  return await api.post(path, obj, opt).then((res) => res.data);
};
const putRequest = async (path: string, obj: object, opt?: object) => {
  return await api.put(path, obj, opt).then((res) => res.data);
};
const deleteRequest = async (path: string, data?: object) => {
  return await api.delete(path, { data }).then((res) => res.data);
};

export {
  apiInstance,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  setApiHeaders,
};
