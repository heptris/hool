import { useNavigate } from "@tanstack/react-location";
import { useDispatch } from "react-redux";

import { setIsLoggedIn } from "store";
import useUser from "./useUser";

import { getMyProfile } from "api/profile";
import { setApiHeaders } from "api";
import {
  postReissue,
  requestLogin,
  requestLogout,
  setAuthApiHeaders,
} from "api/auth";

import { ROUTES_NAME, USER_AUTH_KEY } from "constant";

import { LoginFormType } from "types/LoginFormTypes";

const { ACCESS_TOKEN, REFRESH_TOKEN } = USER_AUTH_KEY;

const useAuth = () => {
  const { clearUser, updateUser } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (form: LoginFormType) => {
    await requestLogin(form)
      .then(async (res) => {
        onLoginSuccess(res.data);
        navigate({ to: `${ROUTES_NAME.MAIN}`, replace: true });
        dispatch(setIsLoggedIn(true));
      })
      .catch((err) => {
        alert("로그인 실패");
      });
  };

  const logout = async () => {
    const logoutResponse = await requestLogout();
    clearUser();
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    window.alert("로그아웃이 완료되었습니다.");
    setApiHeaders();
    setAuthApiHeaders();
    dispatch(setIsLoggedIn(false));
    navigate({ to: `${ROUTES_NAME.MAIN}` });
    return logoutResponse;
  };

  const onLoginSuccess = async (data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
  }) => {
    console.log(data);
    const { accessToken, refreshToken, accessTokenExpiresIn } = data;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    setApiHeaders(accessToken);
    setAuthApiHeaders(accessToken);
    updateUser(await getMyProfile());
    console.log("시간차", accessTokenExpiresIn - Date.now());

    setTimeout(onSilentRefresh, 30 * 60 * 1000);
  };

  const onSilentRefresh = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    console.log("토큰 확인", accessToken, refreshToken);

    if (!accessToken || !refreshToken) {
      console.log("토큰이 유효하지 않습니다.");
      return;
    }
    postReissue({ accessToken, refreshToken })
      .then((res) => {
        console.log("재발행 이후", res);
        onLoginSuccess(res.data);
      })
      .catch((error) => {
        console.log(error, "유효하지 않은 refreshToken");
      });
  };

  return { login, logout, onLoginSuccess, onSilentRefresh };
};

export default useAuth;
