import { useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";

import styled from "styled-components";
import { darkTheme, InputStyle } from "styles";
import Button from "components/commons/Button";
import {
  setAudioEnabled,
  setVideoEnabled,
  setIsCreatingPreferences,
  RootState,
} from "store";
import { useSelector } from "react-redux";

const PreferencesModalBody = () => {
  const dispatch = useDispatch();
  const { audioEnabled, videoEnabled } = useSelector(
    (state: RootState) => state.clientSession
  );

  const [audioSelect, setAudioSelect] = useState(
    audioEnabled ? "마이크 ON" : "마이크 OFF"
  );
  const audioSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAudioSelect(value);
  };

  const [videoSelect, setVideoSelect] = useState(
    videoEnabled ? "비디오 ON" : "비디오 OFF"
  );
  const videoSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);
    setVideoSelect(value);
  };

  const [displayModeSelect, setDisplayModeSelect] = useState("다크 모드");
  const displayModeSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDisplayModeSelect(value);
  };

  const onSumbitHandler = () => {
    audioSelect === "마이크 ON"
      ? dispatch(setAudioEnabled(true))
      : dispatch(setAudioEnabled(false));
    if (videoSelect === "비디오 ON") {
      dispatch(setVideoEnabled(true));
      console.log(videoSelect === "비디오 ON");
    } else {
      console.log(videoSelect + "비디오 OFF 선택");
      dispatch(setVideoEnabled(false));
    }
    dispatch(setIsCreatingPreferences(false));
  };

  return (
    <BodyContainer>
      <Setting>마이크 설정</Setting>
      <Wrapper>
        <InputWrapper>
          <Input
            type="radio"
            id="r1"
            name="audio"
            value="마이크 ON"
            checked={audioSelect === "마이크 ON"}
            onChange={audioSelectChange}
          />
          <Label htmlFor="r1">마이크 ON</Label>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="radio"
            id="r2"
            name="audio"
            value="마이크 OFF"
            checked={audioSelect === "마이크 OFF"}
            onChange={audioSelectChange}
          />
          <Label htmlFor="r2">마이크 OFF</Label>
        </InputWrapper>
      </Wrapper>

      <Setting>비디오 설정</Setting>
      <Wrapper>
        <InputWrapper>
          <Input
            type="radio"
            id="r3"
            name="video"
            value="비디오 ON"
            checked={videoSelect === "비디오 ON"}
            onChange={videoSelectChange}
          />
          <Label htmlFor="r3">비디오 ON</Label>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="radio"
            id="r4"
            name="video"
            value="비디오 OFF"
            checked={videoSelect === "비디오 OFF"}
            onChange={videoSelectChange}
          />
          <Label htmlFor="r4">비디오 OFF</Label>
        </InputWrapper>
      </Wrapper>

      {/* <Setting>화면 모드 설정</Setting>
      <Wrapper>
        <InputWrapper>
          <Input
            type="radio"
            id="r5"
            name="displayMode"
            value="다크 모드"
            checked={displayModeSelect === "다크 모드"}
            onChange={displayModeSelectChange}
          />
          <Label htmlFor="r5">다크 모드</Label>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="radio"
            id="r6"
            name="displayMode"
            value="라이트 모드"
            checked={displayModeSelect === "라이트 모드"}
            onChange={displayModeSelectChange}
            disabled
          />
          <Label htmlFor="r6">라이트 모드</Label>
        </InputWrapper>
      </Wrapper> */}

      <ButtonWrapper>
        <Button
          height={2}
          width={4}
          text={"취소"}
          marginTop={0.5}
          marginBottom={2}
          color={darkTheme.adaptiveGrey500}
          marginRight={1}
          buttonOnClick={() => dispatch(setIsCreatingPreferences(false))}
        />
        <Button
          height={2}
          width={4}
          text={"완료"}
          marginTop={0.5}
          marginBottom={2}
          buttonOnClick={onSumbitHandler}
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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 2rem;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Input = styled.input`
  display: inline-block;
  cursor: pointer;
  height: 1rem;
  width: 1rem;
  border: 1px solid #333;
  line-height: 24px;
  text-align: center;
  font-weight: bold;
  font-size: 13px;
`;
const Label = styled.label`
  font-size: 0.8rem;
`;
const Setting = styled.h1`
  font-size: 0.9rem;
  color: ${darkTheme.adaptiveGrey200};
`;

const ButtonWrapper = styled.div`
  float: right;
`;

export default PreferencesModalBody;
