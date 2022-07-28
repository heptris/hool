import { useState } from "react";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Profile from "components/Profile";
import Inventory from "components/Inventory";

function ProfileView() {
  return (
    <Container>
      <Profile />
      <Inventory />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 4% 0 0 0;
`;

export default ProfileView;
