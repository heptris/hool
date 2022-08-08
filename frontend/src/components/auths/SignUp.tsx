import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import LabelInput from "components/commons/LabelInput";
import Button from "components/commons/Button";
import axios from "axios";

// import { sendSecretMail } from "./EmailAuth";
import { useState } from "react";
import { apiInstance } from "api";
import { HOOL_AUTH_ENDPOINT } from "constant";
import { Link } from "@tanstack/react-location";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [toggle, setToggled] = useState(false);

  const emailAuthHandler = async () => {
    if (!email) {
      return alert("이메일을 입력해주세요");
    }
    setToggled(true);
    const api = apiInstance(HOOL_AUTH_ENDPOINT);
    api
      .post("email", {
        memberEmail: email,
      })
      .then((res) => {
        window.alert(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const emailInputChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const nameInputChangeHandler = (event) => {
    setName(event.target.value);
  };
  const nicknameInputChangeHandler = (event) => {
    setNickname(event.target.value);
  };
  const passwordInputChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const checkPasswordInputChangeHandler = (event) => {
    setCheckPassword(event.target.value);
  };

  const signupHandler = () => {
    const api = apiInstance(HOOL_AUTH_ENDPOINT);
    api
      .post("signup", {
        memberEmail: email,
        name: name,
        nickName: nickname,
        password: password,
      })
      .then((res) => {
        window.alert(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <SignupBox>
        <Link to={"/"}>
          <Logo>hool!</Logo>
        </Link>
        <Title>회원가입</Title>
        <BtnBox>
          <LabelInput
            text="이메일"
            placeholderText="Email"
            type="email"
            info="*필수 정보입니다"
            onChange={emailInputChangeHandler}
          />
          <Button
            CSSProps={"position:absolute; top: 1.5rem; right:0.4rem"}
            text="본인인증"
            width={3.75}
            height={1.875}
            marginLeft={0.5}
            fontSize={0.75}
            onClick={emailAuthHandler}
          />
        </BtnBox>
        {toggle && (
          <LabelInput
            text="인증번호"
            placeholderText="이메일로 발송된 인증번호를 입력해주세요"
            type="text"
          />
        )}
        <FlexBox>
          <LabelInput
            text="이름"
            placeholderText="Name"
            widthSize="9.5rem"
            type="text"
            onChange={nameInputChangeHandler}
          />
          <LabelInput
            text="별명"
            placeholderText="Nickname"
            widthSize="9.5rem"
            type="text"
            info="*사용 중인 별명입니다"
            onChange={nicknameInputChangeHandler}
          />
        </FlexBox>
        <LabelInput
          text="비밀번호"
          placeholderText="Password"
          type="password"
          onChange={passwordInputChangeHandler}
        />
        <LabelInput
          text="비밀번호 확인"
          placeholderText="Password Confirm"
          type="password"
          onChange={passwordInputChangeHandler}
        />
        <Button
          text="회원가입"
          height={3.125}
          width={20}
          marginTop={1}
          onClick={signupHandler}
        />
      </SignupBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.h1`
  font-family: "Lobster", cursive;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  color: ${darkTheme.adaptiveGrey200};
  align-self: start;
  margin-bottom: 1.25rem;
`;

const FlexBox = styled.div`
  width: 20rem;
  display: flex;
  justify-content: space-between;
`;

const BtnBox = styled.div`
  width: 20rem;
  position: relative;
`;

export default SignUp;
