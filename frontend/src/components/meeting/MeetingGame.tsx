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
}: {
  timeLimit: number;
  handleDisplayClose: Function;
  gameName: string;
}) => {
  const leftTime = useCountdown(timeLimit);
  const [days, hours, minutes, seconds] = leftTime;
  const [alertColor, setAlertColor] = useState(infoColor);
  useEffect(() => {
    minutes + seconds <= 0 && handleDisplayClose();
  }, [leftTime]);
  useEffect(() => {
    setAlertColor(
      alertColor === adaptiveGrey500 ? emphasisColor : adaptiveGrey500
    );
  }, [0.5 * seconds]);
  return (
    <GameShowTopBox alertColor={alertColor}>
      <GameSubTitle>참여를 원하지 않으면 모달 바깥을 클릭해주세요</GameSubTitle>
      <GameTitleBox>
        <div>
          <GameBottomTitleText>{gameName}</GameBottomTitleText>
        </div>
        <GameTopText>
          <CountdownTimer leftTime={leftTime} />
        </GameTopText>
      </GameTitleBox>
    </GameShowTopBox>
  );
};

const MeetingGame = ({
  gameInfo,
  handleDisplayClose,
}: {
  gameInfo: GameInfoType;
  handleDisplayClose: Function;
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
    <GameModalWindow>
      <GameModal>
        <GameHeader
          gameName={gameName}
          handleDisplayClose={handleDisplayClose}
          timeLimit={timeLimit}
        />
        <div>
          <GameBottomResultBox>
            <GameAgreeBox
              onClick={() => {
                setGameChoice({
                  ...gameChoice,
                  bettChoice: true,
                });
              }}
            >
              <AgreeTitle>{agreeName}</AgreeTitle>
              <PointWrapper>
                <BtnIcon className="fa-solid fa-cube" />
                <AgreePoint>100</AgreePoint>
              </PointWrapper>
            </GameAgreeBox>
            <GameDisAgreeBox
              onClick={() => {
                setGameChoice({
                  ...gameChoice,
                  bettChoice: false,
                });
              }}
            >
              <DisAgreeTitle>{disagreeName}</DisAgreeTitle>
              <PointWrapper>
                <BtnIcon className="fa-solid fa-cube" />
                <AgreePoint>100</AgreePoint>
              </PointWrapper>
            </GameDisAgreeBox>
          </GameBottomResultBox>
        </div>
      </GameModal>
      <GameModalWrapper
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          handleDisplayClose();
        }}
      />
    </GameModalWindow>
  );
};
const GameSubTitle = styled.p`
  position: absolute;
  font-size: 0.8rem;
  left: 0.5rem;
  top: 0.5rem;
`;
const GameModalWindow = styled.div`
  min-width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9991;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GameModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9990;
  cursor: pointer;
`;
const GameModal = styled.div`
  z-index: 9992;
  min-width: 30%;
`;
const PointWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const GameShowTopBox = styled(MessageBox)`
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: ${({ alertColor }: { alertColor: string }) => alertColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const GameTopText = styled.h3`
  font-size: 1.5rem;
`;

const GameTitleBox = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const GameBottomTitleText = styled.h1`
  font-size: 2rem;
`;

const GameBottomResultBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-top: 0.5rem;
`;

const GameAgreeBox = styled.div`
  overflow: auto;
  width: 49%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  box-sizing: border-box;
  background-color: ${mainBadgeColor};
  cursor: pointer;
`;

const AgreeTitle = styled.h1`
  font-size: 2rem;
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

const GameDisAgreeBox = styled(GameAgreeBox)`
  background-color: ${contrastColor};
`;

const DisAgreeTitle = styled(AgreeTitle)``;

export default MeetingGame;
