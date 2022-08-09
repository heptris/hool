import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyProfile } from "api/profile";
import { useSelector, useDispatch } from "react-redux";
import {
  setNavMode,
  //   setMySessionId,
  //   setMyUserName,
  //   setAudioEnabled,
  //   setVideoEnabled,
  //   setMsgToSend,
  //   setChatEvents,
  //   setEmojiEvents,
} from "store";

import { Session, Publisher, Subscriber } from "openvidu-react";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import type { RootState, ClientSessionType } from "store";

import Container from "components/commons/Container";
import VideoContainer from "./VideoContainer";
import MeetingMessageShow from "./MeetingMessageShow";
import MeetingMessageInput from "./MeetingMessageInput";
import MeetingGame from "./MeetingGame";
import MeetingGameModal from "components/meeting/gameModal/MeetingGameModal";

export type SessionStateType = {
  session: typeof Session | undefined;
  mainStreamManager: typeof Publisher | typeof Subscriber | undefined;
  publisher: typeof Publisher | undefined;
  subscribers: Array<typeof Subscriber>;
};

const MeetingRoom = () => {
  // const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { isCreatingGame, isShowingMessage, isShowingGame } = useSelector(
    (state: RootState) => state.navbar
  );
  useEffect(() => {
    dispatch(setNavMode("meetingRoom"));
    return () => {
      dispatch(setNavMode("default"));
    };
  }, []);
  // const {
  //   mySessionId,
  //   myUserName,
  //   audioEnabled,
  //   videoEnabled,
  //   msgToSend,
  //   chatEvents,
  //   emojiEvents,
  // } = useSelector((state: RootState) => state.sessionState);

  // const myProfile = useQuery(["myProfile"], getMyProfile, {
  //   refetchOnWindowFocus: false,
  //   retry: 0,
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   onError: (e: any) => {
  //     console.error(e.message);
  //   },
  // });

  const [sessionState, setSessionState] = useState({
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: new Array(),
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
            {!isShowingMessage && (
              <MeetingMessageShow sessionState={sessionState} />
            )}
            {!isShowingMessage && (
              <MeetingMessageInput sessionState={sessionState} />
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
