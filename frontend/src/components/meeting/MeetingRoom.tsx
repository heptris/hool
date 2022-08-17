import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Session, Publisher, Subscriber } from "openvidu-react";

import {
  addChatEvents,
  setIsResultMode,
  setIsShowingGame,
  setIsShowingGameSubmit,
  setMsgToSend,
} from "store";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Container from "components/commons/Container";
import VideoContainer from "./VideoContainer";
import MeetingMessageShow from "./MeetingMessageShow";
import MeetingMessageInput from "./MeetingMessageInput";
import MeetingGame from "./MeetingGame";
import MeetingGameModal from "components/meeting/gameModal/MeetingGameModal";

import { QUERY_KEYS } from "constant";

import type { RootState } from "store";
import { EmojiDetailType } from "types/EmojiDetailType";
import Modal from "components/commons/Modal";
export type SessionStateType = {
  session: typeof Session | undefined;
  mainStreamManager: typeof Publisher | typeof Subscriber | undefined;
  publisher: typeof Publisher | undefined;
  subscribers: Array<typeof Subscriber>;
};
import { GameInfoType } from "types/GameInfoType";
import Button from "components/commons/Button";
import { postGameStatistics, postSaveGameResult } from "api/meeting";

function MeetingRoom() {
  const dispatch = useDispatch();
  const {
    isCreatingGame,
    isShowingMessage,
    isShowingGame,
    isShowingGameSubmit,
  } = useSelector((state: RootState) => state.navbar);
  const { audioEnabled, videoEnabled, myUserName, isHost } = useSelector(
    (state: RootState) => state.clientSession
  );
  const [sessionState, setSessionState] = useState<SessionStateType>({
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: new Array(),
  });
  const [gameInfo, setGameInfo] = useState<GameInfoType>({
    gameId: 0,
    gameName: "",
    agreeName: "",
    disagreeName: "",
    timeLimit: 0,
  });
  const [rcvdGameInfo, setRcvdGameInfo] = useState<GameInfoType>({
    gameId: 0,
    gameName: "",
    agreeName: "",
    disagreeName: "",
    timeLimit: 0,
  });
  const { mutate: gameStatisticsMutate } = useMutation(postGameStatistics, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData([QUERY_KEYS.USER]);

  const { session, mainStreamManager, publisher, subscribers } = sessionState;

  useEffect(() => {
    if (publisher === undefined) return;
    switchAudioEnabled(audioEnabled);
  }, [audioEnabled]);
  useEffect(() => {
    if (publisher === undefined) return;
    switchVideoEnabled(videoEnabled);
  }, [videoEnabled]);
  // 세션에 따라 신호 받기
  useEffect(() => {
    session && recvSignal();
  }, [session]);

  // 방장이 게임을 생성했을 경우를 핸들링하는 useEffect
  useEffect(() => {
    if (gameInfo.timeLimit) {
      //게임을 생성하면
      dispatch(setIsResultMode(true)); // navside -> result모드로 변경
      sendGameInfo();
    }
  }, [gameInfo]);
  // 참가자가 게임을 받았을 경우 핸들링하는 useEffect
  useEffect(() => {
    rcvdGameInfo.timeLimit && handleStartGame(); // gameModal 띄우기
  }, [rcvdGameInfo]);

  const handleSessionState = (state: SessionStateType) => {
    setSessionState(state);
  };
  const switchAudioEnabled = (audioState: boolean) => {
    publisher.publishAudio(audioState);
  };
  const switchVideoEnabled = (videoState: boolean) => {
    publisher.publishVideo(videoState);
  };
  const handleStartGame = () => {
    dispatch(setIsShowingGame(true));
    handleGameStatstics();
  };
  const handleGameStatstics = () => {
    setTimeout(
      () => gameStatisticsMutate({ gameId: rcvdGameInfo.gameId }),
      rcvdGameInfo.timeLimit - new Date().getTime() + 1000 // 1초 정도의 여유를 주고 통계창 띄우기
    );
  };

  const sendTextMessage = (msgToSend: string) => {
    if (msgToSend.trim() === "") return;
    session
      .signal({
        data: myUserName + "::" + msgToSend.trim(),
        to: [],
        type: "chat",
      })
      .then(() => {
        dispatch(setMsgToSend(""));
      })
      .catch((err: any) => console.error(err));
  };
  const sendEmojiSignal = (item: EmojiDetailType) => {
    session
      .signal({
        data: myUserName + "::" + item.emojiUrl + "::" + item.emojiAnimate,
        to: [],
        type: "emoji",
      })
      .then(() => {
        console.log("Message successfully sent");
      })
      .catch((err: any) => {
        console.error(err);
      });
  };
  const recvSignal = () => {
    session.on("signal:chat", (event: any) => {
      dispatch(addChatEvents(event.data));
    });
    session.on("signal:gameInfo", (event: any) => {
      console.log("게임 생성 하고 방장이 보낸 게임 데이터");
      setRcvdGameInfo(JSON.parse(event.data));
    });
  };
  const sendGameInfo = () => {
    // console.log("게임 생성 후 데이터 변경 후");
    session
      .signal({
        data: JSON.stringify(gameInfo),
        to: [],
        type: "gameInfo",
      })
      .then(() => {
        console.log("Game Info Message successfully sent");
      })
      .catch((err: any) => {
        console.error(err);
      });
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
            {isShowingMessage && <MeetingMessageShow recvSignal={recvSignal} />}
            {isShowingMessage && (
              <MeetingMessageInput
                sendEmojiSignal={sendEmojiSignal}
                sendTextMessage={sendTextMessage}
              />
            )}
          </GameMessageBox>
        </FlexBox>
      </ConcreteContainer>
      {isCreatingGame && <MeetingGameModal setGameInfo={setGameInfo} />}
      {
        isShowingGameSubmit && <GameResultSubmitModal gameInfo={rcvdGameInfo} /> // 결과입력모달창 부분
      }
      {isShowingGame && (
        <MeetingGame
          gameInfo={rcvdGameInfo}
          handleDisplayClose={() => {
            dispatch(setIsShowingGame(false));
          }}
        />
      )}
    </>
  );
}

const GameResultSubmitModal = (props: { gameInfo: GameInfoType }) => {
  const {
    gameInfo: { agreeName, disagreeName, gameId, gameName },
  } = props;
  const dispatch = useDispatch();
  const [result, setResult] = useState(true);
  return (
    <Modal
      header={<div>경기 결과 입력</div>}
      body={
        <Form>
          <div>{gameName}</div>
          <div>
            <label htmlFor={"agree"}>{agreeName}</label>
            <input
              type="radio"
              id={"agree"}
              name={"gameResult"}
              defaultChecked
              onClick={() => setResult(true)}
            />
            <label htmlFor={"disagree"}>{disagreeName}</label>
            <input
              type="radio"
              id={"disagree"}
              name={"gameResult"}
              onClick={() => setResult(false)}
            />
          </div>
          <Button
            height={1.5}
            width={2}
            buttonOnClick={() => {
              dispatch(setIsShowingGameSubmit(false));
              dispatch(setIsResultMode(false));
              postSaveGameResult({ gameId, result });
            }}
          />
        </Form>
      }
      onDisplayChange={() => {
        dispatch(setIsShowingGameSubmit(false));
      }}
    />
  );
};

const ConcreteContainer = styled(Container)`
  padding: 0;
  width: 100%;
  height: 92vh;
  overflow: hidden;
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
  border-radius: 0 4px 4px 0;
  /* grid-template-rows: repeat(auto-fit, minmax(15rem, 1rem)); */
  /* grid-template-columns: repeat(auto-fit, minmax(33rem, 1fr)); */
  background-color: ${darkTheme.mainColor};
`;
const GameMessageBox = styled.div`
  display: flex;
  flex-direction: column;
`;
///
const Form = styled.div``;
export default MeetingRoom;
