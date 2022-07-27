import React from "react";
import styled from "styled-components";
import { darkTheme } from "@/styles/Theme";
import Card from "./commons/card";
import Form from "./commons/Form";

const Auth = () => {
  return (
    <Container>
      <Card background={darkTheme.adaptiveGrey800}>
        <Form text="이메일" />
        <Form text="비밀번호" />
      </Card>
    </Container>
  );
};

const Container = styled.div`
  width: 60vw;
`;

export default Auth;
