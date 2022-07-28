import styled from "styled-components";
import { darkTheme } from "styles/Theme";
import Button from "../Button";
const { adaptiveGrey200, adaptiveGrey800, adaptiveGrey700, bgColor } =
  darkTheme;
const NavSide = () => {
  return (
    <Side>
      <Logo>hool!</Logo>
      <ButtonGroup>
        <Btn>
          <Icon className="fa-solid fa-list" />
        </Btn>
        <Btn>
          <Icon className="fa-solid fa-users" />
        </Btn>
        <Btn>
          <Icon className="fa-solid fa-face-grin-wide" />
        </Btn>
        <Btn>
          <Icon className="fa-solid fa-gear" />
        </Btn>
      </ButtonGroup>
    </Side>
  );
};
const Side = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 5;
  margin: 0 auto;
  height: 100vh;
  background-color: ${bgColor};
`;
const Logo = styled.h1`
  font-family: "Lobster";
  font-size: 2rem;
  margin-bottom: 3.5rem;
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40vh;
`;
const Btn = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 4px;
  background-color: ${adaptiveGrey800};
  cursor: pointer;

  &:hover {
    background-color: ${adaptiveGrey700};
  }
`;
const Icon = styled.i`
  font-size: 1.5rem;
  color: ${adaptiveGrey200};
`;

export default NavSide;
