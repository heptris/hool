import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import LabelInput from "components/commons/LabelInput";
import Button from "components/commons/Button";
import { ChangeEvent, useState } from "react";
import { apiInstance } from "api";
import { HOOL_AUTH_ENDPOINT } from "constant";
import { Link } from "@tanstack/react-location";

const SendMailResetPWD = () => {
  const [toggle, setToggled] = useState(false);
  const [email, setEmail] = useState("");
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
          setDisabled(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      <SendMailResetPWDBox>
        <Logo>hool!</Logo>
        <Title>이메일로 비밀번호 초기화</Title>
        <SubTitle1>HOOL!에 가입한 이메일을 정확히 입력해 주세요.</SubTitle1>
        <SubTitle2>이메일을 통해 비밀번호 수정 링크가 전송됩니다.</SubTitle2>
        <SendEmailWrapper>
          <LabelInput
            text="이메일"
            placeholderText="Email"
            type="email"
            inputOnChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
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
          {toggle && (
            <InfoWrapper>
              <Info>*위 주소로 비밀번호 설정 메일이 전송되었습니다.</Info>
              <Info>메일을 확인해주세요.</Info>
            </InfoWrapper>
          )}
        </SendEmailWrapper>
        {toggle && (
          <SendEmailWrapper>
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
            {!disabled && (
              <InfoWrapper>
                <Info>인증이 완료되었습니다.</Info>
              </InfoWrapper>
            )}
          </SendEmailWrapper>
        )}
        <LabelInput
          text="비밀번호"
          placeholderText="Password"
          type="password"
        />
        <LabelInput
          text="비밀번호 확인"
          placeholderText="Password Confirm"
          type="password"
        />

        <SignupBtn
          text="비밀번호 초기화"
          width={20}
          height={3.125}
          marginBottom={0.25}
          disabled={disabled}
        />
      </SendMailResetPWDBox>
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

const SendMailResetPWDBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SendEmailWrapper = styled.div`
  width: 20rem;
  position: relative;
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

const SubTitle1 = styled.div`
  font-size: 0.625rem;
  color: ${darkTheme.adaptiveGrey500};
  align-self: start;
  margin-bottom: 0.25rem;
`;

const SubTitle2 = styled.div`
  font-size: 0.625rem;
  color: ${darkTheme.adaptiveGrey500};
  align-self: start;
  margin-bottom: 1.5rem;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;
const Info = styled.div`
  font-size: 0.687rem;
  align-self: start;
  margin-bottom: 0.25rem;
  color: ${darkTheme.infoColor};
`;

const SignupBtn = styled(Button)`
  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, ${darkTheme.contrastColor});
  }
`;
export default SendMailResetPWD;
