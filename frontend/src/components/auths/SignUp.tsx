import { ChangeEvent, useState } from "react";
import { Link } from "@tanstack/react-location";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import LabelInput from "components/commons/LabelInput";
import Button from "components/commons/Button";

import { apiInstance } from "api";
import { HOOL_AUTH_ENDPOINT } from "constant";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [toggle, setToggled] = useState(false);
  const [code, setCode] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailSendHandler = () => {
    if (!email) {
      return alert("이메일을 입력해주세요");
    }
    const api = apiInstance(HOOL_AUTH_ENDPOINT);
    api
      .post("mail", {
        email: email,
      })
      .then((res) => {
        if (res.status === 200) {
          window.alert("메일이 발송되었습니다.");
          setToggled(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const emailAuthHandler = () => {
    if (!code) {
      return alert("인증번호를 입력해주세요");
    }
    const api = apiInstance(HOOL_AUTH_ENDPOINT);
    api
      .post("verifyCode", {
        code: code,
      })
      .then((res) => {
        if (res.status === 200) {
          window.alert("인증이 완료되었습니다.");
          setDisabled(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const emailInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const nameInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const nicknameInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };
  const passwordInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const checkPasswordInputChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
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
            inputOnChange={emailInputChangeHandler}
          />
          <Button
            CSSProps={"position:absolute; top: 1.5rem; right:0.4rem"}
            text="본인인증"
            width={3.75}
            height={1.875}
            marginLeft={0.5}
            fontSize={0.75}
            buttonOnClick={emailSendHandler}
          />
        </BtnBox>
        {toggle && (
          <BtnBox>
            <LabelInput
              text="인증번호"
              placeholderText="이메일로 발송된 인증번호를 입력해주세요"
              type="text"
              inputOnChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCode(e.target.value)
              }
            />
            <Button
              CSSProps={"position:absolute; top: 1.5rem; right:0.4rem"}
              text="확인"
              width={3}
              height={1.875}
              marginLeft={0.5}
              fontSize={0.75}
              buttonOnClick={emailAuthHandler}
            />
          </BtnBox>
        )}
        <FlexBox>
          <LabelInput
            text="이름"
            placeholderText="Name"
            widthSize="9.5rem"
            type="text"
            inputOnChange={nameInputChangeHandler}
          />
          <LabelInput
            text="별명"
            placeholderText="Nickname"
            widthSize="9.5rem"
            type="text"
            info="*사용 중인 별명입니다"
            inputOnChange={nicknameInputChangeHandler}
          />
        </FlexBox>
        <LabelInput
          text="비밀번호"
          placeholderText="Password"
          type="password"
          inputOnChange={passwordInputChangeHandler}
        />
        <LabelInput
          text="비밀번호 확인"
          placeholderText="Password Confirm"
          type="password"
          inputOnChange={passwordInputChangeHandler}
        />
        <SignupBtn
          text="회원가입"
          height={3.125}
          width={20}
          marginTop={1}
          buttonOnClick={signupHandler}
          disabled={disabled}
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

const SignupBtn = styled(Button)`
  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, ${darkTheme.contrastColor});
  }
`;

export default SignUp;
