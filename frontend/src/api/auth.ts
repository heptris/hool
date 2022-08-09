import { apiInstance } from "api";
import { HOOL_AUTH_ENDPOINT } from "constant";

import { LoginFormType } from "types/LoginFormTypes";

const api = apiInstance(HOOL_AUTH_ENDPOINT);

const requestLogin = async ({ memberEmail, password }: LoginFormType) => {
  return await api
    .post(`login`, {
      memberEmail,
      password,
    })
    .then((response) => {
      sessionStorage.setItem("accessToken", response.data.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.data.refreshToken);
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

const postConfirmEmail = async (obj: { email: string }) => {
  const { data } = await api.post(`mail`, obj);
  return data;
};

const postCheckNickName = async (obj: { nickName: string }) => {
  const { data } = await api.post(`nickname/check`, obj);
  return data;
};

const postSignUp = async (obj: {
  memberEmail: string;
  name: string;
  nickName: string;
  password: string;
}) => {
  const { data } = await api.post(`signup`, obj);
  return data;
};

const postVerifyCode = async (obj: { code: string }) => {
  const { data } = await api.post(`verifyCode`, obj);
  return data;
};

export {
  requestLogin,
  requestLogout,
  postReissue,
  postConfirmEmail,
  postCheckNickName,
  postSignUp,
  postVerifyCode,
};
