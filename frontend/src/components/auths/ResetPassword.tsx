import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import LabelInput from "components/commons/LabelInput";

const ResetPassword = () => {
  return (
    <Container>
      <ResetPasswordBox>
        <Logo>hool!</Logo>
        <Title>비밀번호 초기화</Title>
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
        <Button text="회원가입" height={3.125} width={20} marginTop={1} />
      </ResetPasswordBox>
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

const ResetPasswordBox = styled.div`
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

export default ResetPassword;
