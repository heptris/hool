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

const SignUp = () => {
  return (
    <Container>
      <SignupBox>
        <Logo>hool!</Logo>
        <Title>회원가입</Title>
        <BtnBox>
          <Form
            text="이메일"
            placeholderText="Email"
            type="email"
            info="*필수 정보입니다"
          />
          <Button
            CSSProps={"position:absolute; top: 1.5rem; right:0.4rem"}
            text="본인인증"
            width={3.75}
            height={1.875}
            marginLeft={0.5}
            fontSize={0.75}
          />
        </BtnBox>

        <FlexBox>
          <Form
            text="이름"
            placeholderText="Name"
            widthSize="8.6rem"
            type="text"
          />
          <Form
            text="별명"
            placeholderText="Nickname"
            widthSize="8.6rem"
            type="text"
            info="*사용 중인 별명입니다"
          />
        </FlexBox>
        <Form text="비밀번호" placeholderText="Password" type="password" />
        <Form
          text="비밀번호 확인"
          placeholderText="Password Confirm"
          type="password"
        />
        <Button text="회원가입" height={3.125} width={20} marginTop={1} />
      </SignupBox>
    </Container>
  );
};

export default SignUp;
