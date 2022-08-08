import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "api";
import axios from "axios";
import { HOOL_AUTH_ENDPOINT } from "constant";
import { Cookies } from "react-cookie";
import { LoginFormType } from "types/LoginFormTypes";

const api = apiInstance(HOOL_AUTH_ENDPOINT);
const cookies = new Cookies();

export const requestLogin = async ({
  memberEmail,
  password,
}: LoginFormType) => {
  console.log(memberEmail, password);

  return await api
    .post(`login`, {
      memberEmail,
      password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.data.accessToken);
      // cookies.set("myToken", response.data.data.accessToken);
      // api.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${response.data.data.accessToken}`;

      return response.data;
    });
};

export const requestLogout = async () => {
  const { data } = await api.get(`logout`);
  return data;
};
