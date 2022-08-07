import styled from "styled-components";
import { darkTheme, InputStyle } from "styles";

import Button from "components/commons/Button";
import { useState } from "react";

const MeetingGameModalBody = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAgree, setEnteredAgree] = useState("");
  const [enteredDisagree, setEnteredDisagree] = useState("");
  const [enteredTime, setEnteredTime] = useState(1);
  const [enteredTitleLength, setEnteredTitleLength] = useState(0);

  const titleInputChangeHandler = (event) => {
    let TitleMessage = event.target.value;
    let TitleLength = TitleMessage.length;
    if (TitleLength >= 45) {
      TitleMessage = TitleMessage.slice(0, 44);
      setEnteredTitle(TitleMessage);
    }
    setEnteredTitle(TitleMessage);
    setEnteredTitleLength(TitleLength);
  };

  const agreeInputChangeHandler = (event) => {
    setEnteredAgree(event.target.value);
  };

  const disagreeInputChangeHandler = (event) => {
    setEnteredDisagree(event.target.value);
  };

  const TimeInputChangeHandler = (event) => {
    setEnteredTime(event.target.value);
  };
  const clearHandler = () => {
    setEnteredTitle("");
    setEnteredAgree("");
    setEnteredDisagree("");
    setEnteredTime(1);
  };
  const submitHandler = () => {
    console.log(enteredTime, enteredTitle, enteredAgree, enteredDisagree);
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
        <TextLength>( {enteredTitleLength} / 45 )</TextLength>
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
            <TimeInputLabel htmlFor="게임시간">단위 : 분</TimeInputLabel>
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
          onClick={clearHandler}
        />
        <Button
          height={2}
          width={4}
          text={"완료"}
          marginBottom={2}
          onClick={submitHandler}
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
  font-size: 0.8rem;
  color: ${darkTheme.adaptiveGrey200};
  margin-bottom: 0.5rem;
`;
const GameSubTitle = styled.h1`
  font-size: 0.5rem;
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
  font-size: 0.5rem;
  margin-bottom: 0.3rem;
`;
const TimeInput = styled.input`
  width: 3rem;
  height: 1.5rem;
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
