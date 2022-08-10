import { apiInstance } from "api";
import { HOOL_AUTH_ENDPOINT } from "constant";

import { LoginFormType } from "types/LoginFormTypes";

const api = apiInstance(HOOL_AUTH_ENDPOINT);

const requestLogin = async (form: LoginFormType) =>
  await api.post(`login`, form).then((res) => res.data);

const requestLogout = async () =>
  await api.get(`logout`).then((res) => res.data);

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
