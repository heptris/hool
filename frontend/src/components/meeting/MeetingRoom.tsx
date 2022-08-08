import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getMyProfile } from "api/profile";

import { Session, Publisher, Subscriber } from "openvidu-react";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import { RootState } from "store";

import Container from "components/commons/Container";
import VideoContainer from "./VideoContainer";
import MeetingMessageShow from "./MeetingMessageShow";
import MeetingMessageInput from "./MeetingMessageInput";
import MeetingGame from "./MeetingGame";
import MeetingGameModal from "components/meeting/gameModal/MeetingGameModal";

export type SessionStateType = {
  mySessionId: string;
  myUserName: string;
  session: typeof Session | undefined;
  mainStreamManager: typeof Publisher | typeof Subscriber | undefined;
  publisher: typeof Publisher | undefined;
  subscribers: Array<typeof Subscriber>;
  audioEnabled: boolean;
  videoEnabled: boolean;
  msgToSend: string;
  emojiEvents: Array<Object>;
  chatEvents: Array<Object>;
};

const MeetingRoom = () => {
  const queryClient = useQueryClient();
  const { isCreatingGame } = useSelector((state: RootState) => state.navbar);
  const { isShowingMessage } = useSelector((state: RootState) => state.navbar);
  const { isShowingGame } = useSelector((state: RootState) => state.navbar);

  const myProfile = useQuery(["myProfile"], getMyProfile, {
    refetchOnWindowFocus: true,
    retry: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (e: any) => {
      console.error(e.message);
    },
  });

  const [sessionState, setSessionState] = useState({
    mySessionId: "SessionA",
    myUserName: myProfile.data.data?.nickName,
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: new Array(),
    audioEnabled: false,
    videoEnabled: false,
    msgToSend: "",
    emojiEvents: new Array(),
    chatEvents: new Array(),
  });
  const handleSessionState = (state: SessionStateType) => {
    setSessionState(state);
  };

  return (
    <>
      <ConcreteContainer>
        <FlexBox>
          <MeetingBox>
            <VideoContainer
              sessionState={sessionState}
              handleSessionState={handleSessionState}
            />
          </MeetingBox>
          <GameMessageBox>
            {isShowingGame && <MeetingGame />}
            {!isShowingMessage && <MeetingMessageShow />}
            {!isShowingMessage && (
              <MeetingMessageInput
                sessionState={sessionState}
                handleSessionState={handleSessionState}
              />
            )}
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
