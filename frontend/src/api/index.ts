import axios from "axios";

import { HOOL_API_ENDPOINT } from "constant";

const apiInstance = (baseURL = HOOL_API_ENDPOINT) => {
  const api = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });
  api.interceptors.request.use(
    async (config) => {
      const token = sessionStorage.getItem("accessToken");
      token && (config.headers!.Authorization = `Bearer ${token}`);
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
  return api;
};

const api = apiInstance();

const getRequest = async (path: string) => {
  return await api.get(path).then((res) => res.data);
};
const postRequest = async (path: string, obj: object) => {
  return await api.post(path, obj).then((res) => res.data);
};
const putRequest = async (path: string, obj: object) => {
  return await api.put(path, obj).then((res) => res.data);
};
const deleteRequest = async (path: string, data?: object) => {
  return await api.delete(path, { data }).then((res) => res.data);
};

export { apiInstance, getRequest, postRequest, putRequest, deleteRequest };
