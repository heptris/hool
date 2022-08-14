import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useNavigate } from "@tanstack/react-location";

import useAuth from "hooks/useAuth";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import { requestGoogleLogin } from "api/auth";

import googleLogoImg from "assets/google-logo-img.png";

import { ROUTES_NAME } from "constant";

const google_key = import.meta.env.VITE_SOME_KEY_GOOGLE_ID;

const GoogleLoginBtn = () => {
  const { onLoginSuccess } = useAuth();
  const navigate = useNavigate();
  const onSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("tokenId" in res) {
      console.log("LOGIN SUCCESS!", res);
      const { tokenId } = res;
      requestGoogleLogin({
        googleIdToken: tokenId,
      })
        .then(async (res) => {
          if (res.status === 200) {
            console.log(res);

            onLoginSuccess(res.data);
            navigate({ to: `${ROUTES_NAME.MAIN}`, replace: true });
          }
        })
        .catch((err) => alert(err));
    }
  };

  const onFailure = (err: any) => {
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
