import React from "react";
import { GoogleLogin } from "react-google-login";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import { useNavigate } from "@tanstack/react-location";
import googleLogoImg from "assets/google-logo-img.png";
import axios from "axios";
import useUser from "../../hooks/useUser";
import { ROUTES_NAME, USER_SESSIONSTORAGE_KEY } from "constant";
import { getMyProfile } from "api/profile";

const google_key = import.meta.env.VITE_SOME_KEY_GOOGLE_ID;

const GoogleLoginBtn = () => {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const onSuccess = async (res) => {
    console.log("LOGIN SUCCESS!", res);
    const { tokenId } = res;
    axios
      .post("https://i7a408.p.ssafy.io/auth/google/login", {
        googleIdToken: tokenId,
      })
      .then(async (res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          const { accessToken, refreshToken } = res.data.data;
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
        }
      })
      .catch((err) => alert(err));
  };

  const onFailure = (err) => {
    console.log("LOGIN FAILED!", err);
  };

  return (
    <div>
      <GoogleLogin
        clientId={google_key}
        buttonText="구글 간편 로그인"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <GoogleDIV onClick={renderProps.onClick}>
            <GoogleLogoImg src={googleLogoImg} alt="google-logo-img" />
            <GoogleText>구글 계정으로 로그인</GoogleText>
          </GoogleDIV>
        )}
      />
    </div>
  );
};

const GoogleDIV = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 11rem;
  height: 2rem;
  justify-content: space-evenly;
  flex-direction: row;
  border-radius: 4px;
  padding: 0.2rem;
  background-color: ${darkTheme.white};
  margin-top: 3rem;

  &:hover {
    cursor: pointer;
  }
`;

const GoogleLogoImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

const GoogleText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  vertical-align: middle;
  line-height: 20px;
  padding: 0.3rem;
  color: ${darkTheme.mainColor};
`;

export default GoogleLoginBtn;
