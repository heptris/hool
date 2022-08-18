import styled from "styled-components";
import { darkTheme } from "styles/Theme";
import { IconStyle } from "styles/IconStyle";

import { MessageBox } from "./MeetingMessageInput";

import { GameInfoType } from "types/GameInfoType";
import CountdownTimer from "utils/CountdownTimer";
import { useCountdown } from "hooks/useCountdown";
import { useEffect, useState } from "react";
import { postCreateGameHistory } from "api/meeting";
import { useMutation } from "@tanstack/react-query";
import { GameHistoryType } from "types/GameHistoryType";
import Modal from "components/commons/Modal";

const {
  contrastColor,
  darkBadgeColor,
  mainBadgeColor,
  adaptiveGrey200,
  adaptiveGrey500,
  bgColor,
  infoColor,
  emphasisColor,
  darkColor,
} = darkTheme;

const GameHeader = ({
  gameName,
  timeLimit,
  handleDisplayClose,
  handleStaticGameClose,
}: {
  timeLimit: number;
  handleDisplayClose: Function;
  gameName: string;
  handleStaticGameClose: Function;
}) => {
  const leftTime = useCountdown(timeLimit);
  const [days, hours, minutes, seconds] = leftTime;
  const [alertColor, setAlertColor] = useState(infoColor);
  useEffect(() => {
    if (minutes + seconds === 0) {
      handleDisplayClose();
      handleStaticGameClose(false);
    }
  }, [leftTime]);
  useEffect(() => {
    setAlertColor(
      alertColor === adaptiveGrey500 ? emphasisColor : adaptiveGrey500
    );
  }, [0.5 * seconds]);
  return (
    <Header>
      <HeaderText>게임 예측 투표</HeaderText>
      <GameShowTopBox alertColor={alertColor}>
        <CountdownTimer leftTime={leftTime} />
      </GameShowTopBox>
    </Header>
  );
};

export const MeetingStaticGame = ({
  gameInfo,
  handleDisplayClose,
  handleStaticGameClose,
}: {
  gameInfo: GameInfoType;
  handleDisplayClose: Function;
  handleStaticGameClose: Function;
}) => {
  const { timeLimit, agreeName, disagreeName, gameId, gameName } = gameInfo;
  const [gameChoice, setGameChoice] = useState<GameHistoryType>({
    bettPoint: 100,
    gameId,
  });
  const { mutate } = useMutation(postCreateGameHistory, {
    onSuccess: () => {
      handleDisplayClose();
    },
  });
  useEffect(() => {
    gameChoice.bettChoice !== undefined && mutate(gameChoice);
  }, [gameChoice]);

  return (
    <GamePredictWrapper>
      <GameHeader
        gameName={gameName}
        handleDisplayClose={handleDisplayClose}
        timeLimit={timeLimit}
        handleStaticGameClose={handleStaticGameClose}
      />
      <Hr />
      <GameWrapper>
        <TextWrapper>
          <Text>게임 제목 </Text>
          <GameName>{gameName}</GameName>
        </TextWrapper>
        <GamePredict>
          <Text>게임 예측</Text>
          <AgreeItem
            onClick={() => {
              setGameChoice({
                ...gameChoice,
                bettChoice: true,
              });
              alert("게임 참여 완료!");
            }}
          >
            <AgreeTitle>{agreeName}</AgreeTitle>
            <PointWrapper>
              <BtnIcon className="fa-solid fa-cube" />
              <AgreePoint>100</AgreePoint>
            </PointWrapper>
          </AgreeItem>
          <DisAgreeItem
            onClick={() => {
              setGameChoice({
                ...gameChoice,
                bettChoice: false,
              });
              alert("게임 참여 완료!");
            }}
          >
            <DisAgreeTitle>{disagreeName}</DisAgreeTitle>
            <PointWrapper>
              <BtnIcon className="fa-solid fa-cube" />
              <AgreePoint>100</AgreePoint>
            </PointWrapper>
          </DisAgreeItem>
        </GamePredict>
      </GameWrapper>
    </GamePredictWrapper>
  );
};

const MeetingGame = ({
  gameInfo,
  handleDisplayClose,
  handleStaticGameClose,
}: {
  gameInfo: GameInfoType;
  handleDisplayClose: Function;
  handleStaticGameClose: Function;
}) => {
  const { timeLimit, agreeName, disagreeName, gameId, gameName } = gameInfo;
  const [gameChoice, setGameChoice] = useState<GameHistoryType>({
    bettPoint: 100,
    gameId,
  });

  const { mutate } = useMutation(postCreateGameHistory, {
    onSuccess: () => {
      handleDisplayClose();
    },
  });

  useEffect(() => {
    return () => {
      console.log("게임 종료");
    };
  }, []);
  useEffect(() => {
    gameChoice.bettChoice !== undefined && mutate(gameChoice);
  }, [gameChoice]);

  return (
    <Modal
      header={
        <GameHeader
          gameName={gameName}
          handleDisplayClose={handleDisplayClose}
          timeLimit={timeLimit}
          handleStaticGameClose={handleStaticGameClose}
        />
      }
      body={
        <GameWrapper>
          <TextWrapper>
            <Text>게임 제목 </Text>
            <GameName>{gameName}</GameName>
          </TextWrapper>
          <GamePredict>
            <Text>게임 예측</Text>
            <AgreeItem
              onClick={() => {
                setGameChoice({
                  ...gameChoice,
                  bettChoice: true,
                });
                alert("게임 참여 완료!");
              }}
            >
              <AgreeTitle>{agreeName}</AgreeTitle>
              <PointWrapper>
                <BtnIcon className="fa-solid fa-cube" />
                <AgreePoint>100</AgreePoint>
              </PointWrapper>
            </AgreeItem>
            <DisAgreeItem
              onClick={() => {
                setGameChoice({
                  ...gameChoice,
                  bettChoice: false,
                });
                alert("게임 참여 완료!");
              }}
            >
              <DisAgreeTitle>{disagreeName}</DisAgreeTitle>
              <PointWrapper>
                <BtnIcon className="fa-solid fa-cube" />
                <AgreePoint>100</AgreePoint>
              </PointWrapper>
            </DisAgreeItem>
          </GamePredict>
        </GameWrapper>
      }
      onDisplayChange={handleDisplayClose}
    />
  );
};

const GamePredictWrapper = styled.div`
  display: flex;
  height: 25rem;
  border-radius: 4px;
  flex-direction: column;
  background-color: ${darkTheme.mainColor};
  margin-left: 1rem;
`;
const Hr = styled.hr`
  width: 100%;
  border: 1px solid ${darkTheme.adaptiveGrey700};
  background-color: ${darkTheme.adaptiveGrey700};
`;
const Header = styled.div`
  margin: 1.5rem 1rem 1rem;
  height: 2rem;
  width: 20rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderText = styled.div`
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
const GamePredict = styled.div`
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

const PointWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const GameShowTopBox = styled(MessageBox)`
  width: 5rem;
  height: 1rem;
  margin: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ alertColor }: { alertColor: string }) => alertColor};
`;

const AgreeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${mainBadgeColor};
  height: 3rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${darkTheme.emphasisColor};
  }
`;

const DisAgreeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${contrastColor};
  height: 3rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${darkTheme.emphasisColor};
  }
`;
const AgreeTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const BtnIcon = styled.i`
  ${IconStyle}
  color:${darkTheme.white};
`;

const AgreePoint = styled.h1`
  font-size: 1rem;
  margin-left: 0.3rem;
`;

const DisAgreeTitle = styled(AgreeTitle)``;

export default MeetingGame;
