import { useNavigate } from "@tanstack/react-location";
import { requestLogin, requestLogout } from "api/auth";
import { getMyProfile } from "api/profile";

import { ROUTES_NAME, USER_SESSIONSTORAGE_KEY } from "constant";
import { LoginFormType } from "types/LoginFormTypes";
import useUser from "./useUser";

const useAuth = () => {
  const { clearUser, updateUser } = useUser();
  const navigate = useNavigate();

  const login = async (form: LoginFormType) => {
    return await requestLogin(form)
      .then(async (res) => {
        const { accessToken, refreshToken } = res.data;
        sessionStorage.setItem(
          USER_SESSIONSTORAGE_KEY.ACCESS_TOKEN,
          accessToken
        );
        sessionStorage.setItem(
          USER_SESSIONSTORAGE_KEY.REFRESH_TOKEN,
          refreshToken
        );
        updateUser(await getMyProfile(res.data.accessToken));
        navigate({ to: `${ROUTES_NAME.MAIN}`, replace: true });
        return res;
      })
      .catch((err) => {
        alert("로그인 실패");
      });
  };

  const logout = async () => {
    clearUser();
    sessionStorage.removeItem(USER_SESSIONSTORAGE_KEY.ACCESS_TOKEN);
    sessionStorage.removeItem(USER_SESSIONSTORAGE_KEY.REFRESH_TOKEN);
    window.alert("로그아웃이 완료되었습니다.");
    navigate({ to: `${ROUTES_NAME.MAIN}`, replace: true });
    return await requestLogout();
  };

  return { login, logout };
};

export default useAuth;
