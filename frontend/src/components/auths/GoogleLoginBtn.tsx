import React from "react";
import { GoogleLogin } from "react-google-login";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import googleLogoImg from "assets/google-logo-img.png";

const google_key = import.meta.env.VITE_SOME_KEY_GOOGLE_ID;

// { onSocial }
const GoogleLoginBtn = () => {
  const onSuccess = (response) => {
    console.log("LOGIN SUCCESS!", response);
    const {
      googleId,
      profileObj: { email, name },
    } = response;

    // await onSocial({
    //   socialId: googleId,
    //   socialType: "google",
    //   email,
    //   nickname: name,
    // });
  };

  const onFailure = (error) => {
    console.log("LOGIN FAILED!", error);
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
