import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Session,
  Publisher,
  Subscriber,
  Stream,
  Device,
  SignalEvent,
} from "openvidu-browser";

import {
  addChatEvents,
  setIsResultMode,
  setIsShowingGame,
  setIsShowingGameSubmit,
  setMsgToSend,
  setEmojiEvents,
} from "store";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Container from "components/commons/Container";
import VideoContainer from "./VideoContainer";
import MeetingMessageShow from "./MeetingMessageShow";
import MeetingMessageInput from "./MeetingMessageInput";
import MeetingGame, { MeetingStaticGame } from "./MeetingGame";
import MeetingGameModal from "components/meeting/gameModal/MeetingGameModal";
import Modal from "components/commons/Modal";

import { QUERY_KEYS } from "constant";

import type { RootState } from "store";
import { EmojiDetailType } from "types/EmojiDetailType";
export type SessionStateType = {
  session: Session | undefined;
  mainStreamManager: Publisher | Subscriber | Stream | undefined;
  publisher: Publisher | undefined;
  subscribers: Array<Subscriber>;
  currentVideoDevice?: Device | undefined;
};
import { GameInfoType } from "types/GameInfoType";
import Button from "components/commons/Button";
import { postGameStatistics, postSaveGameResult } from "api/meeting";
import { UserInfoType } from "types/UserInfoType";

function MeetingRoom() {
  const dispatch = useDispatch();
  const {
    isCreatingGame,
    isShowingMessage,
    isShowingGame,
    isShowingGameSubmit,
  } = useSelector((state: RootState) => state.navbar);
  const { audioEnabled, videoEnabled, myUserName, isHost, emojiEvents } =
    useSelector((state: RootState) => state.clientSession);
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
  const userInfo = queryClient.getQueryData<UserInfoType>([QUERY_KEYS.USER]);

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
    if (session === undefined) return;

    recvChatSignal();
    recvGameSignal();
    recvEmojiSignal();
  }, [session]);

  const [showGameModal, setShowGameModal] = useState(false);
  const handleStaticGameClose = (value: boolean) => {
    setShowGameModal(value);
    console.log(showGameModal);
  };

  // 방장이 게임을 생성했을 경우를 핸들링하는 useEffect
  useEffect(() => {
    if (gameInfo.timeLimit) {
      //게임을 생성하면
      dispatch(setIsResultMode(true)); // navside -> result모드로 변경
      sendGameInfo();
      setShowGameModal(true);
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
    if (publisher === undefined) return;

    publisher.publishAudio(audioState);
  };
  const switchVideoEnabled = (videoState: boolean) => {
    if (publisher === undefined) return;

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
    if (session === undefined) return;
    if (msgToSend.trim() === "") return;

    session
      .signal({
        data: JSON.stringify({
          myUserName: myUserName,
          msgToSend: msgToSend.trim(),
          memberProfile: userInfo?.memberProfile,
        }),
        to: [],
        type: "chat",
      })
      .then(() => {
        dispatch(setMsgToSend(""));
      })
      .catch((err: any) => console.error(err));
  };
  const sendGameInfo = () => {
    // console.log("게임 생성 후 데이터 변경 후");
    if (session === undefined) return;

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
  const sendEmojiSignal = (item: EmojiDetailType) => {
    if (session === undefined) return;

    session
      .signal({
        data:
          myUserName +
          "::" +
          item.emojiUrl +
          "::" +
          item.emojiAnimate +
          "::" +
          Math.random(),
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
  const recvChatSignal = () => {
    if (session === undefined) return;

    session.on("signal:chat", (event: SignalEvent) => {
      dispatch(addChatEvents(event.data!));
    });
  };
  const recvGameSignal = () => {
    if (session === undefined) return;

    session.on("signal:gameInfo", (event: SignalEvent) => {
      console.log("게임 생성 하고 방장이 보낸 게임 데이터");
      setRcvdGameInfo(JSON.parse(event.data!));
    });
  };
  const recvEmojiSignal = () => {
    const mySession = session;
    if (mySession === undefined) return;

    mySession.on("signal:emoji", (event: SignalEvent) => {
      if (event.from === undefined) return;
      if (publisher === undefined) return;

      const sender = event.from.connectionId;
      const myPublisher = publisher.stream.connection.connectionId;
      const mySubscribers = subscribers.map(
        (sub: Subscriber) => sub.stream.connection.connectionId
      );

      // connection.data "{\"clientData\":\"myUserName#105957535666388128155\"}"
      // connection.role "PUBLISHER"

      const idx =
        sender !== myPublisher
          ? mySubscribers.indexOf(sender)
          : emojiEvents.length - 1;
      if (idx === -1) return;

      const newEmojiEvents = emojiEvents.map((emo: string, i: number) =>
        idx === i ? event.data! : emo
      );

      dispatch(setEmojiEvents(newEmojiEvents));
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
          {!isShowingGame && showGameModal && (
            <MeetingStaticGame
              handleStaticGameClose={handleStaticGameClose}
              gameInfo={rcvdGameInfo}
              handleDisplayClose={() => {
                dispatch(setIsShowingGame(false));
              }}
            />
          )}
          <GameMessageBox>
            {isShowingMessage && (
              <MeetingMessageShow recvSignal={recvChatSignal} />
            )}
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
          handleStaticGameClose={handleStaticGameClose}
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
      header={<Header>경기 결과 입력</Header>}
      body={
        <Form>
          <GameWrapper>
            <TextWrapper>
              <Text>게임 제목 </Text>
              <GameName>{gameName}</GameName>
            </TextWrapper>
            <GameResult>
              <Text>게임 결과</Text>
              <Wrapper>
                <Item>
                  <RadioButton
                    type="radio"
                    id={"agree"}
                    name={"gameResult"}
                    defaultChecked
                    onClick={() => setResult(true)}
                  />
                  <RadioButtonLabel htmlFor={"agree"} />
                  <div>{agreeName}</div>
                </Item>
                <Item>
                  <RadioButton
                    type="radio"
                    id={"disagree"}
                    name={"gameResult"}
                    onClick={() => setResult(false)}
                  />
                  <RadioButtonLabel htmlFor={"disagree"} />
                  <div>{disagreeName}</div>
                </Item>
              </Wrapper>
            </GameResult>
            <ButtonWrapper>
              <Button
                height={2.5}
                width={7}
                text="제출"
                buttonOnClick={() => {
                  dispatch(setIsShowingGameSubmit(false));
                  dispatch(setIsResultMode(false));
                  postSaveGameResult({ gameId, result });
                }}
              />
            </ButtonWrapper>
          </GameWrapper>
        </Form>
      }
      onDisplayChange={() => {
        dispatch(setIsShowingGameSubmit(false));
      }}
    />
  );
};
const Header = styled.div`
  margin: 1.5rem 1rem 1rem;
  width: 20rem;
  font-size: 1rem;
  font-weight: bold;
`;
const GameWrapper = styled.div`
  margin: 1rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.div`
  width: 30%;
  font-size: 0.825rem;
  margin-bottom: 1rem;
`;
const GameName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border: 1px solid ${darkTheme.adaptiveGrey200};
  border-radius: 8px;
  margin-bottom: 1rem;
`;
const GameResult = styled.div`
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  height: auto;
  width: 100%;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  position: relative;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 1rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: #ccc;
    &::after {
      content: "\f005";
      font-family: "FontAwesome";
      display: block;
      color: white;
      width: 12px;
      height: 12px;
      margin-left: 3px;
      margin-top: 4px;
    }
  }
  &:checked + ${Item} {
    background: ${darkTheme.mainBadgeColor};
    border: 2px solid ${darkTheme.mainBadgeColor};
  }
  &:checked + ${RadioButtonLabel} {
    background: ${darkTheme.mainBadgeColor};
    border: 1px solid ${darkTheme.mainBadgeColor};
    &::after {
      content: "\f005";
      font-family: "FontAwesome";
      display: block;
      color: white;
      width: 12px;
      height: 12px;
      margin-left: 3px;
      margin-top: 4px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
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
