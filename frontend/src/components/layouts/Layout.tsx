import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import { RootState } from "store";

import Footer from "./Footer";
import NavHeader from "./NavHeader";
import NavSide from "./NavSide";
import { MeetingModal } from "components/meeting";
import PreferencesModal from "./modal/PreferencesModal";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isCreatingRoom, navMode, isCreatingPreferences } = useSelector(
    (state: RootState) => state.navbar
  );

  return (
    <>
      <NavSide />
      <Main>
        <NavHeader />
        <Container>{children}</Container>
        {navMode !== "meetingRoom" && <Footer />}
      </Main>
      {isCreatingRoom && <MeetingModal />}
      {isCreatingPreferences && <PreferencesModal />}
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
