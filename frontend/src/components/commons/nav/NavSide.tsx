import styled from "styled-components";
import { darkTheme } from "styles/Theme";
import Button from "../Button";
const NavSide = () => {
  return (
    <SideContainer>
      <Side>
        <Logo>hool!</Logo>
        <ButtonGroup>
          <Button isSqr={true} text={"♟️"} color={"grey"} />
          <Button isSqr={true} text={"♟️"} color={"grey"} />
          <Button isSqr={true} text={"♟️"} color={"grey"} />
          <Button isSqr={true} text={"♟️"} color={"grey"} />
        </ButtonGroup>
      </Side>
    </SideContainer>
  );
};
const SideContainer = styled.div`
  width: 10%;
`;
const Side = styled.div`
  background-color: ${darkTheme.darkColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 40%;
`;
const Logo = styled.h1`
  font-family: "Lobster";
  font-size: 2rem;
  margin-bottom: 9rem;
`;

export default NavSide;
