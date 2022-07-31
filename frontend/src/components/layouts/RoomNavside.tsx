import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { letterSpacingSize } from "styles/GlobalStyle";
import { darkTheme } from "styles/Theme";

const Side = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 5;
  margin: 0 auto;
  height: 100vh;
  width: 3rem;
  background-color: ${darkTheme.bgColor};
`;

const Logo = styled.h1`
  font-family: "Lobster", cursive;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const ButtonGroup = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Btn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 4px;
  background-color: ${darkTheme.adaptiveGrey800};
  margin: 0 0 1.75rem 0;
  cursor: pointer;

  &:hover {
    background-color: ${darkTheme.adaptiveGrey700};
  }
`;

const Icon = styled.i`
  font-size: 1rem;
  color: ${darkTheme.adaptiveGrey200};
  margin: 0 ${letterSpacingSize}rem 0 0;
`;

const RoomOutDIv = styled.div`
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomNavside = () => {
  return (
    <Side>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <Logo>hool!</Logo>
      </NavLink>
      <ButtonGroup>
        <ButtonWrapper>
          <Btn>
            <Icon className="fa-solid fa-microphone"></Icon>
          </Btn>
          <Btn>
            <Icon className="fa-solid fa-video"></Icon>
          </Btn>
          <Btn>
            <Icon className="fa-solid fa-comment"></Icon>
          </Btn>
          <Btn>
            <Icon className="fa-solid fa-gamepad"></Icon>
          </Btn>
          <Btn>
            <Icon className="fa-solid fa-gear"></Icon>
          </Btn>
        </ButtonWrapper>
        <RoomOutDIv>
          <Btn>
            <Icon className="fa-solid fa-right-from-bracket"></Icon>
          </Btn>
        </RoomOutDIv>
      </ButtonGroup>
    </Side>
  );
};

export default RoomNavside;
