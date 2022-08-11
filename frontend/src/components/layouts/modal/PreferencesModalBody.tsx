import { useDispatch } from "react-redux";

import styled from "styled-components";
import { darkTheme, InputStyle } from "styles";
import Button from "components/commons/Button";
import { useState } from "react";
import { setIsCreatingPreferences } from "store";

const PreferencesModalBody = () => {
  const dispatch = useDispatch();

  return (
    <BodyContainer>
      <Setting>스피커 설정</Setting>

      <Setting>비디오 설정</Setting>

      <Setting>화면 모드 설정</Setting>

      <ButtonWrapper>
        <Button
          height={2}
          width={4}
          text={"취소"}
          marginBottom={2}
          color={darkTheme.adaptiveGrey500}
          marginRight={1}
        />
        <Button height={2} width={4} text={"완료"} marginBottom={2} />
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
const Setting = styled.h1`
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

export default PreferencesModalBody;
