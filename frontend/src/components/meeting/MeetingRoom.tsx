import styled from "styled-components";
import { darkTheme } from "styles/Theme";
import MeetingMessageShow from "./MeetingMessageShow";
import MeetingMessageInput from "./MeetingMessageInput";

import Container from "components/commons/Container";
import MeetingVideo from "./MeetingVideo";
import MeetingGame from "./MeetingGame";
import VideoContainer from "./VideoContainer";

const FlexBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const MeetingBox = styled.div`
  width: 100%;
  height: 100%;
  /* display: grid; */
  /* flex-shrink: 3; */
  /* justify-content: center; */
  /* align-items: center; */
  box-sizing: border-box;
  border-radius: 4px;
  /* grid-template-rows: repeat(auto-fit, minmax(15rem, 1rem)); */
  /* grid-template-columns: repeat(auto-fit, minmax(33rem, 1fr)); */
  background-color: ${darkTheme.mainColor};
`;

const GameMessageBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MeetingRoom = () => {
  return (
    <Container>
      <FlexBox>
        <MeetingBox>
          <VideoContainer />
        </MeetingBox>
        <GameMessageBox>
          <MeetingGame />
          <MeetingMessageShow />
          <MeetingMessageInput />
        </GameMessageBox>
      </FlexBox>
    </Container>
  );
};

export default MeetingRoom;
