import { useSelector } from "react-redux";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import { RootState } from "store";

import MeetingMessageShow from "./MeetingMessageShow";
import MeetingMessageInput from "./MeetingMessageInput";
import MeetingVideo from "./MeetingVideo";
import MeetingGame from "./MeetingGame";
import MeetingGameModal from "components/meeting/gameModal/MeetingGameModal";

const MeetingRoom = () => {
  const { isCreatingGame } = useSelector((state: RootState) => state.navbar);
  return (
    <>
      <Container>
        <FlexBox>
          <MeetingBox>
            <MeetingVideo />
            <MeetingVideo />
            <MeetingVideo />
            <MeetingVideo />
          </MeetingBox>
          <GameMessageBox>
            <MeetingGame />
            <MeetingMessageShow />
            <MeetingMessageInput />
          </GameMessageBox>
        </FlexBox>
      </Container>
      {isCreatingGame && <MeetingGameModal />}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const FlexBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const MeetingBox = styled.div`
  width: 66.375rem;
  height: 57.2rem;
  margin-top: 2.5rem;
  margin-left: 3rem;
  display: grid;
  flex-shrink: 3;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 1rem;
  grid-template-rows: repeat(2, 21rem);
  grid-template-columns: repeat(2, 33rem);
  background-color: ${darkTheme.mainColor};
`;

const GameMessageBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MeetingRoom;
