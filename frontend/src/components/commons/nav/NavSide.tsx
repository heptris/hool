import styled from "styled-components";
import { darkTheme } from "styles/Theme";
import Button from "../Button";
const { adaptiveGrey200, adaptiveGrey800, emphasisColor, mainColor } =
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
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 1vw;
  margin: 0 auto;
  height: 90vh;
  background-color: ${mainColor};
`;
const Logo = styled.h1`
  font-family: "Lobster";
  font-size: 2.5rem;
  margin-bottom: 6rem;
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
    background-color: ${emphasisColor};
  }
`;
const Icon = styled.i`
  font-size: 1.5rem;
  color: ${adaptiveGrey200};
`;

export default NavSide;
