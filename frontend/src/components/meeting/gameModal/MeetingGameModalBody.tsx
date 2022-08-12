import { ChangeEvent, useState } from "react";
import { useMatch } from "@tanstack/react-location";
import { useMutation } from "@tanstack/react-query";

import useGame from "hooks/useGame";

import styled from "styled-components";
import { darkTheme, InputStyle } from "styles";

import Button from "components/commons/Button";

const MeetingGameModalBody = ({
  onDisplayChange,
  setGameInfo,
}: {
  onDisplayChange: Function;
  setGameInfo: Function;
}) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAgree, setEnteredAgree] = useState("");
  const [enteredDisagree, setEnteredDisagree] = useState("");
  const [enteredTime, setEnteredTime] = useState("1");

  const { createGame } = useGame();
  const {
    params: { id },
  } = useMatch();
  const { mutate } = useMutation(createGame, {
    onSuccess(data) {
      const dt = new Date();
      setGameInfo({
        gameId: data.data.gameId,
        gameName: enteredTitle,
        agreeName: enteredAgree,
        disagreeName: enteredDisagree,
        timeLimit: dt.setMinutes(dt.getMinutes() + +enteredTime),
      });
    },
  });

  const titleInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let TitleMessage = event.target.value;
    let TitleLength = TitleMessage.length;
    TitleLength >= 45 && (TitleMessage = TitleMessage.slice(0, 45));
    setEnteredTitle(TitleMessage);
  };
  const agreeInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredAgree(event.target.value);
  };
  const disagreeInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredDisagree(event.target.value);
  };
  const TimeInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredTime(event.target.value);
  };
  const clearHandler = () => {
    setEnteredTitle("");
    setEnteredAgree("");
    setEnteredDisagree("");
    setEnteredTime("1");
    onDisplayChange();
  };
  const submitHandler = async () => {
    mutate({ conferenceId: +id, gameName: enteredTitle });
    clearHandler();
  };

  return (
    <BodyContainer>
      <Wrapper>
        <GameTitle>게임 제목</GameTitle>
        <TitleInput
          placeholder="방제목을 최대 45자 이내로 작성해주세요"
          type="text"
          key="게임 제목"
          onChange={titleInputChangeHandler}
          value={enteredTitle}
        />
        <TextLength>( {enteredTitle.length} / 45 )</TextLength>
      </Wrapper>
      <Wrapper>
        <GameFlexWrapper>
          <GameTitle>가능한 결과</GameTitle>
          <GameSelectWrapper>
            <GameInput
              widthSize="20rem"
              height="2rem"
              placeholder="결과 1 ( 예 : 가능 )"
              required
              value={enteredAgree}
              onChange={agreeInputChangeHandler}
            />
            <GameInput
              widthSize="20rem"
              height="2rem"
              placeholder="결과 2 ( 예 : 응안돼 )"
              required
              value={enteredDisagree}
              onChange={disagreeInputChangeHandler}
            />
          </GameSelectWrapper>
        </GameFlexWrapper>
      </Wrapper>
      <Wrapper>
        <GameFlexWrapper>
          <GameTimeWrapper>
            <GameTitle>제출 시간</GameTitle>
            <GameSubTitle>
              참가자가 예측에 참여할 수 있는 제한 시간입니다.
            </GameSubTitle>
          </GameTimeWrapper>
          <TimeInputWrapper>
            <TimeInputLabel htmlFor="게임시간">
              단위 : 분, 최대 5분
            </TimeInputLabel>
            <TimeInput
              id="게임시간"
              type="number"
              min="1"
              max="5"
              step="1"
              value={enteredTime}
              onChange={TimeInputChangeHandler}
            />
          </TimeInputWrapper>
        </GameFlexWrapper>
      </Wrapper>
      <ButtonWrapper>
        <Button
          height={2}
          width={4}
          text={"취소"}
          marginBottom={2}
          color={darkTheme.adaptiveGrey500}
          marginRight={1}
          buttonOnClick={clearHandler}
        />
        <Button
          height={2}
          width={4}
          text={"완료"}
          marginBottom={2}
          buttonOnClick={submitHandler}
        />
      </ButtonWrapper>
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  width: 40vw;
  max-width: 30rem;
  padding: 1rem;
`;
const Wrapper = styled.div`
  margin-bottom: 2rem;
`;
const GameFlexWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const GameTitle = styled.h1`
  font-size: 1rem;
  color: ${darkTheme.adaptiveGrey200};
  margin-bottom: 0.5rem;
`;
const GameSubTitle = styled.h1`
  font-size: 0.7rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const TextLength = styled.h1`
  text-align: end;
  font-size: 0.6rem;
`;
const GameSelectWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;
const GameTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleInput = styled.input`
  ${InputStyle}
  width:100%;
`;
const TimeInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TimeInputLabel = styled.label`
  display: flex;
  align-self: flex-end;
  font-size: 0.7rem;
  margin-bottom: 0.3rem;
`;
const TimeInput = styled.input`
  ${InputStyle}
  width: 5rem;
  height: 2rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding-left: 0.5rem;
`;
const GameInput = styled.input`
  ${InputStyle}
  width:100%;
`;
const ButtonWrapper = styled.div`
  float: right;
`;

export default MeetingGameModalBody;
