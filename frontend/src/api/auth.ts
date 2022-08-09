// import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "api";
// import axios from "axios";
import { HOOL_AUTH_ENDPOINT } from "constant";
// import { Cookies } from "react-cookie";
import { LoginFormType } from "types/LoginFormTypes";

const api = apiInstance(HOOL_AUTH_ENDPOINT);
// const cookies = new Cookies();

const requestLogin = async ({ memberEmail, password }: LoginFormType) => {
  return await api
    .post(`login`, {
      memberEmail,
      password,
    })
    .then((response) => {
      sessionStorage.setItem("accessToken", response.data.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.data.refreshToken);
      // cookies.set("myToken", response.data.data.accessToken);
      // api.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${response.data.data.accessToken}`;

      return response.data;
    });
};

const requestLogout = async () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  const { data } = await api.get(`logout`);
  return data;
};

const postReissue = async (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  const { data } = await api.post(`reissue`, tokens);
  return data;
};

// SignUp용 axios 객체는 SignUp 컴포넌트 내에 존재
// const postSignUp =async (params:) => {

// };

export { requestLogin, requestLogout, postReissue };
