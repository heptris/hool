import styled from "styled-components";
import { darkTheme } from "styles/Theme";
import { MessageBox } from "./MeetingMessageInput";
import { IconStyle } from "styles/IconStyle";

const GameShowTopBox = styled(MessageBox)`
  height: 1.5rem;
  padding: 0px 1rem;
  background-color: ${darkTheme.mainColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GameTopText = styled.h1`
  font-size: 0.8rem;
`;

const GameShowBottomBox = styled(MessageBox)`
  margin-top: 0rem;
  height: 16rem;
  padding: 1px 0rem;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: ${darkTheme.adaptiveGrey800};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
`;

const GameBottomTitleBox = styled.div`
  width: 97%;
  height: 3.5rem;
  background-color: ${darkTheme.adaptiveGrey700};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameBottomTitleText = styled.h1`
  font-size: 1rem;
`;

const GameBottomResultBox = styled.div`
  width: 25rem;
  height: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const GameAgreeBox = styled.div`
  width: 49%;
  height: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
`;

const GameAgreeLeftBox = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

const GameAgreeLeftInnerBox = styled.div`
  width: 4rem;
  padding: 0.2rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GameAgreeLeftInnerText = styled.h1`
  font-size: 0.8rem;
`;

const InnerIcon = styled.i`
  ${IconStyle}
  color:${darkTheme.mainBadgeColor};
`;

const GameAgreeRightBox = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;
`;

const AgreeTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  align-self: flex-end;
  color: ${darkTheme.mainBadgeColor};
`;

const AgreePercent = styled.h1`
  font-size: 1.5rem;
  align-self: flex-end;
  color: ${darkTheme.mainBadgeColor};
`;

const AgreeGraph = styled.div`
  width: 8px;
  height: 1rem;
  align-self: flex-end;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: ${darkTheme.mainBadgeColor};
`;

const AgreeBtn = styled.button`
  width: 3.75rem;
  height: 1.8rem;
  background-color: ${darkTheme.mainBadgeColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BtnIcon = styled.i`
  ${IconStyle}
  color:${darkTheme.white};
`;

const AgreePoint = styled.h1`
  font-size: 0.8rem;
  margin-left: 0.3rem;
`;

const GameDisAgreeBox = styled(GameAgreeBox)``;

const GameDisAgreeLeftBox = styled(GameAgreeRightBox)``;

const DisAgreeTitle = styled(AgreeTitle)`
  align-self: flex-start;
  color: ${darkTheme.contrastColor};
`;

const DisAgreePercent = styled(AgreePercent)`
  align-self: flex-start;
  color: ${darkTheme.contrastColor};
`;

const DisAgreeGraph = styled(AgreeGraph)`
  align-self: flex-start;
  border-top-left-radius: 0px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 4px;
  width: 92px;
  background-color: ${darkTheme.contrastColor};
`;
const DisAgreeBtn = styled(AgreeBtn)`
  background-color: ${darkTheme.contrastColor};
`;

const GameDisAgreeRightBox = styled(GameAgreeLeftBox)`
  margin: 0rem;
`;

const DisagreeInnerIcon = styled.i`
  ${IconStyle}
  color:${darkTheme.contrastColor};
`;

const GameDisAgreeRightInnerBox = styled(GameAgreeLeftInnerBox)``;

const GamePointChange = styled.h1`
  font-size: 0.65rem;
  text-decoration: underline;
  margin-bottom: 1rem;
`;

const MeetingGame = () => {
  return (
    <>
      <GameShowTopBox>
        <GameTopText>예측</GameTopText>
        <GameTopText>00:45</GameTopText>
      </GameShowTopBox>
      <GameShowBottomBox>
        <GameBottomTitleBox>
          <GameBottomTitleText>토트넘 3골 가능?</GameBottomTitleText>
        </GameBottomTitleBox>
        <GameBottomResultBox>
          <GameAgreeBox>
            <GameAgreeLeftBox>
              <GameAgreeLeftInnerBox>
                <InnerIcon className="fa-solid fa-moon" />
                <GameAgreeLeftInnerText>5,802.3만</GameAgreeLeftInnerText>
              </GameAgreeLeftInnerBox>
              <GameAgreeLeftInnerBox>
                <InnerIcon className="fa-solid fa-trophy" />
                <GameAgreeLeftInnerText>x13.33</GameAgreeLeftInnerText>
              </GameAgreeLeftInnerBox>
              <GameAgreeLeftInnerBox>
                <InnerIcon className="fa-solid fa-people-group" />
                <GameAgreeLeftInnerText>7,654</GameAgreeLeftInnerText>
              </GameAgreeLeftInnerBox>
            </GameAgreeLeftBox>
            <GameAgreeRightBox>
              <AgreeTitle>가능</AgreeTitle>
              <AgreePercent>8%</AgreePercent>
              <AgreeGraph></AgreeGraph>
              <AgreeBtn>
                <BtnIcon className="fa-solid fa-cube" />
                <AgreePoint>10</AgreePoint>
              </AgreeBtn>
            </GameAgreeRightBox>
          </GameAgreeBox>
          <GameDisAgreeBox>
            <GameDisAgreeLeftBox>
              <DisAgreeTitle>응안돼</DisAgreeTitle>
              <DisAgreePercent>92%</DisAgreePercent>
              <DisAgreeGraph></DisAgreeGraph>
              <DisAgreeBtn>
                <BtnIcon className="fa-solid fa-cube" />
                <AgreePoint>10</AgreePoint>
              </DisAgreeBtn>
            </GameDisAgreeLeftBox>
            <GameDisAgreeRightBox>
              <GameDisAgreeRightInnerBox>
                <DisagreeInnerIcon className="fa-solid fa-moon" />
                <GameAgreeLeftInnerText>5,802.3만</GameAgreeLeftInnerText>
              </GameDisAgreeRightInnerBox>
              <GameDisAgreeRightInnerBox>
                <DisagreeInnerIcon className="fa-solid fa-trophy" />
                <GameAgreeLeftInnerText>x13.33</GameAgreeLeftInnerText>
              </GameDisAgreeRightInnerBox>
              <GameDisAgreeRightInnerBox>
                <DisagreeInnerIcon className="fa-solid fa-people-group" />
                <GameAgreeLeftInnerText>7,654</GameAgreeLeftInnerText>
              </GameDisAgreeRightInnerBox>
            </GameDisAgreeRightBox>
          </GameDisAgreeBox>
        </GameBottomResultBox>
        <GamePointChange>배팅 포인트 변경</GamePointChange>
      </GameShowBottomBox>
    </>
  );
};

export default MeetingGame;
