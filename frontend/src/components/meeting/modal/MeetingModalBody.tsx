import styled from "styled-components";
import { darkTheme } from "styles";

import Button from "components/commons/Button";
import LabelTextarea from "components/commons/LabelTextarea";
import SearchBar from "components/commons/SearchBar";
import LabelWrapper from "components/commons/LabelWrapper";

const MeetingModalBody = () => {
  return (
    <BodyContainer>
      <Wrapper>
        <LabelTextarea
          height={"6rem"}
          width={"100%"}
          placeholderText="여기에 응원방 제목을 적어주세요"
          text="응원방 제목"
          info={`0 / 140`}
        />
      </Wrapper>
      <Wrapper>
        <LabelTextarea
          height={"6rem"}
          width={"100%"}
          placeholderText="여기에 설명을 적어주세요"
          text="설명"
          info={`0 / 140`}
        />
      </Wrapper>
      <Wrapper>
        <LabelWrapper htmlFor="카테고리 검색" text="카테고리 검색" />
        <SearchBar searchPlaceholder={"카테고리 검색"} widthSize={"100%"} />
      </Wrapper>
      <Wrapper>
        <LabelWrapper htmlFor="태그 검색" text="태그 검색" />
        <SearchBar searchPlaceholder={"태그 검색"} widthSize={"100%"} />
        <Desc>
          태그는 다른 사람들이 방에 대한 정보를 통해 더 쉽게 방을 찾도록 콘텐츠
          세부 정보를 공유합니다
        </Desc>
      </Wrapper>
      <ToggleWrapper>
        <ToggleButtonInputWrapper>
          <ToggleTitle>방 공개 여부</ToggleTitle>
          <ToggleButtonWrapper htmlFor="toggle">
            <input type={"checkbox"} id={"toggle"} hidden />
            <ToggleButton />
            <ButtonText>
              <TextSpan htmlFor="toggle">공 개</TextSpan>
              <TextSpan htmlFor="toggle">비공개</TextSpan>
            </ButtonText>
          </ToggleButtonWrapper>
        </ToggleButtonInputWrapper>
        <Desc>
          응원방을 비공개로 만들 경우 친구 초대 또는 친구 따라가기만을 통해
          입장이 가능합니다.
        </Desc>
      </ToggleWrapper>
      <ButtonWrapper>
        <Button
          height={3}
          width={6}
          text={"취소"}
          marginBottom={2}
          color={darkTheme.adaptiveGrey500}
          marginRight={1}
        />
        <Button height={3} width={6} text={"완료"} marginBottom={2} />
      </ButtonWrapper>
    </BodyContainer>
  );
};
const BodyContainer = styled.div`
  width: 40vw;
  max-height: 70vh;
  max-width: 30rem;
  padding: 1rem;
  overflow: auto;
`;
const Wrapper = styled.div`
  margin-bottom: 2rem;
`;
const ToggleTitle = styled.span`
  font-size: 1rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const ToggleWrapper = styled.div`
  position: relative;
  margin: 0;
  overflow: hidden;
  margin-bottom: 2rem;
`;
const ToggleButtonInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
const ToggleButtonWrapper = styled.label`
  position: relative;
  width: 40%;
  height: 2rem;
  background-color: ${darkTheme.adaptiveGrey500};
  border-radius: 4px;
  float: right;
  cursor: pointer;
`;
const ButtonText = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;
const TextSpan = styled.label`
  z-index: 1;
  cursor: pointer;
`;
const ToggleButton = styled.span`
  box-sizing: border-box;
  border-radius: 4px;
  height: 85%;
  line-height: 1;
  background-color: ${darkTheme.mainBadgeColor};
  cursor: pointer;
  width: 49%;
  position: absolute;
  top: 50%;
  left: 0.2rem;
  transform: translateY(-50%);
  input:checked ~ & {
    left: calc(50%);
  }
  transition: all 0.2s ease-in;
`;
const Desc = styled.span`
  font-size: 0.75rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const ButtonWrapper = styled.div`
  float: right;
`;

export default MeetingModalBody;
