import { Link } from "@tanstack/react-location";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { gapi } from "gapi-script";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import useAuth from "hooks/useAuth";

import Button from "components/commons/Button";
import LabelInput from "components/commons/LabelInput";
import GoogleLoginBtn from "./GoogleLoginBtn";

const google_key = import.meta.env.VITE_SOME_KEY_GOOGLE_ID;

const Auth = () => {
  const eMailRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    memberEmail: "",
    password: "",
  });
  const { login } = useAuth();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value, id } = e.target;
    await setForm({
      ...form,
      [id ? id : placeholder]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(form);
    setForm({
      memberEmail: "",
      password: "",
    });
    eMailRef.current?.focus();
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: { google_key },
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <Container>
      <FormBox onSubmit={handleSubmit}>
        <Link to={"/"}>
          <Logo>hool!</Logo>
        </Link>
        <Title>로그인</Title>
        <LabelInput
          inputRef={eMailRef}
          inputValue={form.memberEmail}
          text="이메일"
          placeholderText="Email"
          type="email"
          inputOnChange={onChange}
          id={"memberEmail"}
        />
        <LabelInput
          text="비밀번호"
          placeholderText="Password"
          type="password"
          inputValue={form.password}
          inputOnChange={onChange}
        />
        <LinkText to={"/auth/find"}>
          비밀번호를 잊어버리셨나요? 비밀번호 초기화
        </LinkText>
        <Button text="로그인" width={20} height={3.125} marginBottom={0.25} />
        <LinkText to={"/auth/signup"}>계정이 없으신가요? 회원가입</LinkText>
        <GoogleLoginBtn />
      </FormBox>
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

const FormBox = styled.form`
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

const LinkText = styled(Link)`
  display: flex;
  text-decoration: none;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  align-self: start;
  color: ${darkTheme.adaptiveGrey200};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default Auth;
