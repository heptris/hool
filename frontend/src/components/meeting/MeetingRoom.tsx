import { useSelector } from "react-redux";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import { RootState } from "store";

import Container from "components/commons/Container";
import MeetingMessageShow from "./MeetingMessageShow";
import MeetingMessageInput from "./MeetingMessageInput";
import MeetingVideo from "./MeetingVideo";
import MeetingGame from "./MeetingGame";
import MeetingGameModal from "components/meeting/gameModal/MeetingGameModal";
import VideoContainer from "./VideoContainer";

const MeetingRoom = () => {
  const { isCreatingGame } = useSelector((state: RootState) => state.navbar);
  const { isShowingMessage } = useSelector((state: RootState) => state.navbar);
  const { isShowingGame } = useSelector((state: RootState) => state.navbar);
  return (
    <>
      <ConcreteContainer>
        <FlexBox>
          <MeetingBox>
            <VideoContainer />
          </MeetingBox>
          <GameMessageBox>
            {isShowingGame && <MeetingGame />}
            {isShowingMessage && <MeetingMessageShow />}
            {isShowingMessage && <MeetingMessageInput />}
          </GameMessageBox>
        </FlexBox>
      </ConcreteContainer>
      {isCreatingGame && <MeetingGameModal />}
    </>
  );
};

const ConcreteContainer = styled(Container)`
  padding: 0;
  width: 100%;
  height: 92vh;
`;
const FlexBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const MeetingBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* display: grid; */
  /* flex-shrink: 3; */
  justify-content: center;
  align-items: center;
  /* box-sizing: border-box; */
  border-radius: 4px;
  /* grid-template-rows: repeat(auto-fit, minmax(15rem, 1rem)); */
  /* grid-template-columns: repeat(auto-fit, minmax(33rem, 1fr)); */
  background-color: ${darkTheme.mainColor};
`;
const GameMessageBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MeetingRoom;
