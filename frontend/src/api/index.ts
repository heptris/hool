import axios from "axios";

import { HOOL_API_ENDPOINT } from "constant";

const apiInstance = (baseURL = HOOL_API_ENDPOINT) => {
  const api = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });
  api.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("token");
      config.headers!.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
  return api;
};

export { apiInstance };
