import { useState } from "react";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Profile from "./Profile";
import Inventory from "./Inventory";

function ProfileView() {
  return (
    <Container>
      <Profile />
      <Inventory />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
`;

export default ProfileView;
