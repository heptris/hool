import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Room from "./Room";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const MeetingBox = styled.div`
  width: 91.68rem;
  height: 57.68rem;
  margin-top: 2.5rem;
  margin-left: 3rem;
  display: grid;
  padding: 1rem;
  grid-template-rows: repeat(2, 21rem);
  grid-template-columns: repeat(2, 45rem);
  grid-auto-rows: 100px;
  background-color: ${darkTheme.bgColor};
`;

const MeetingRoom = () => {
  return (
    <Container>
      <MeetingBox>
        <Room />
        <Room />
        <Room />
        <Room />
      </MeetingBox>
    </Container>
  );
};

export default MeetingRoom;
