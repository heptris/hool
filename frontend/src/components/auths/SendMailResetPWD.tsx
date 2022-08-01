import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Form from "components/commons/Form";
import Button from "components/commons/Button";

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

const Info = styled.div`
  font-size: 0.687rem;
  align-self: start;
  margin-bottom: 0.25rem;
  color: ${darkTheme.infoColor};
`;

const SendMailResetPWD = () => {
  return (
    <Container>
      <SendMailResetPWDBox>
        <Logo>hool!</Logo>
        <Title>이메일로 비밀번호 초기화</Title>
        <SubTitle1>HOOL!에 가입한 이메일을 정확히 입력해 주세요.</SubTitle1>
        <SubTitle2>이메일을 통해 비밀번호 수정 링크가 전송됩니다.</SubTitle2>
        <Form text="이메일" placeholderText="Email" type="email" />
        <Button
          text="비밀번호 찾기"
          width={20}
          height={3.125}
          marginBottom={0.25}
        />
        <Info>*위 주소로 비밀번호 설정 메일이 전송되었습니다.</Info>
        <Info>메일을 확인해주세요.</Info>
      </SendMailResetPWDBox>
    </Container>
  );
};

export default SendMailResetPWD;
