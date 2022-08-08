import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "api";
import axios from "axios";
import { HOOL_AUTH_ENDPOINT } from "constant";
import { Cookies } from "react-cookie";

const api = apiInstance(HOOL_AUTH_ENDPOINT);
const cookies = new Cookies();

export const requestLogin = async (email: string, pw: string) => {
  const [ret, retApi] = await api
    .post(`login`, {
      memberEmail: email,
      password: pw,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.data.accessToken);
      // cookies.set("myToken", response.data.data.accessToken);
      // api.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${response.data.data.accessToken}`;

      return [response.data, api];
    });

  return ret;
};

export const requestLogout = async () => {
  const { data } = await api.get(`logout`);
  return data;
};
