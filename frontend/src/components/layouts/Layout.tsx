import React, { ReactElement, ReactFragment } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import NavHeader from "./NavHeader";
import NavSide from "./NavSide";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavSide />
      <Main>
        <NavHeader />
        <Container>{children}</Container>
        <Footer />
      </Main>
    </>
  );
};
const Main = styled.div`
  position: absolute;
  top: 0;
  left: 7rem;
  right: 0;
  bottom: 0;
`;
const Container = styled.main`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: start;
`;
