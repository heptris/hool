import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-location";
import React, { ChangeEvent, useState } from "react";

import { postCreateMeetingRoom } from "api/meeting";

import { setMySessionId } from "store";

import styled from "styled-components";
import { darkTheme } from "styles";

import Button from "components/commons/Button";
import LabelTextarea from "components/commons/LabelTextarea";
import SearchBar from "components/commons/SearchBar";
import LabelWrapper from "components/commons/LabelWrapper";
import { CreatingMeetingRoomType } from "types/CreatingMeetingRoomType";
import LabelInput from "components/commons/LabelInput";

const MeetingModalBody = ({
  onDisplayChange,
}: {
  onDisplayChange: Function;
}) => {
  const [roomCreatingForm, setRoomCreatingForm] =
    useState<CreatingMeetingRoomType>({
      conferenceCategory: "SOCCER",
      description: "",
      title: "",
      tag: "",
      isPublic: true,
      conferencePassword: "",
    });
  const {
    conferenceCategory,
    description,
    isPublic,
    title,
    conferencePassword,
    tag,
  } = roomCreatingForm;
  const navigate = useNavigate();
  const createRoomMutation = useMutation(postCreateMeetingRoom);
  const dispatch = useDispatch();

  const { mutate, isLoading, isError, error, isSuccess, data } =
    createRoomMutation;

  const onChange = (
    key:
      | "conferenceCategory"
      | "description"
      | "title"
      | "tag"
      | "conferencePassword",
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    limit?: number
  ) => {
    const { value } = e.target;
    setRoomCreatingForm({
      ...roomCreatingForm,
      [key]: limit ? value.substring(0, limit) : value,
    });
  };

  if (isSuccess) {
    onDisplayChange();
    dispatch(setMySessionId(data.data.conferenceId));
    navigate({ to: `/meeting/${data.data.conferenceId}` });
  }

  return (
    <BodyContainer>
      <Wrapper>
        <LabelTextarea
          height={"5rem"}
          width={"100%"}
          placeholderText="여기에 응원방 제목을 적어주세요"
          text="응원방 제목"
          info={`${title.length} / 140`}
          textareaValue={title}
          textareaOnChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange("title", e, 140)
          }
        />
      </Wrapper>
      <Wrapper>
        <LabelTextarea
          height={"5rem"}
          width={"100%"}
          placeholderText="여기에 설명을 적어주세요"
          text="설명"
          info={`${description.length} / 140`}
          textareaValue={description}
          textareaOnChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange("description", e, 140)
          }
        />
      </Wrapper>
      <Wrapper>
        <LabelWrapper htmlFor="카테고리 선택" text="카테고리 선택" />
        <Select
          name="choice"
          value={conferenceCategory}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onChange("conferenceCategory", e)
          }
        >
          <Option value="SOCCER">축구</Option>
          <Option value="BASEBALL">야구</Option>
          <Option value="BASKETBALL">농구</Option>
          <Option value="VOLLEYBALL">배구</Option>
          <Option value="ESPORTS">E-Sports</Option>
        </Select>
      </Wrapper>
      {/* <Wrapper>
        <LabelWrapper htmlFor="태그 검색" text="태그 검색" />
        <SearchBar
          searchPlaceholder={"태그 검색"}
          widthSize={"100%"}
          inputValue={tag || ""}
          inputOnChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange("tag", e)
          }
        />
        <Desc>
          태그는 다른 사람들이 방에 대한 정보를 통해 더 쉽게 방을 찾도록 콘텐츠
          세부 정보를 공유합니다
        </Desc>
      </Wrapper> */}
      <ToggleWrapper>
        <ToggleButtonInputWrapper>
          <ToggleTitle>방 공개 여부</ToggleTitle>
          <RowDiv>
            <ToggleButtonWrapper htmlFor="toggle">
              <input
                type={"checkbox"}
                id={"toggle"}
                hidden
                checked={!isPublic}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRoomCreatingForm({
                    ...roomCreatingForm,
                    isPublic: !e.target.checked,
                  });
                }}
              />
              <ToggleButton />
              <ButtonText>
                <TextSpan htmlFor="toggle">공 개</TextSpan>
                <TextSpan htmlFor="toggle">비공개</TextSpan>
              </ButtonText>
            </ToggleButtonWrapper>
            <Desc>
              응원방을 비공개로 만들 경우 친구 초대 또는 친구 따라가기만을 통해
              입장이 가능합니다.
            </Desc>
          </RowDiv>
        </ToggleButtonInputWrapper>
      </ToggleWrapper>
      {!isPublic && (
        <Wrapper>
          <LabelInput
            placeholderText="방 비밀번호"
            text="방 비밀번호"
            inputValue={conferencePassword}
            inputOnChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange("conferencePassword", e)
            }
            widthSize={"100%"}
            height={"2.5rem"}
          />
        </Wrapper>
      )}
      <ButtonWrapper>
        <Button
          height={2}
          width={4}
          text={"취소"}
          marginBottom={1.5}
          color={darkTheme.adaptiveGrey500}
          marginRight={0.5}
          buttonOnClick={onDisplayChange}
        />
        <Button
          height={2}
          width={4}
          text={"완료"}
          marginBottom={1.5}
          buttonOnClick={() => mutate(roomCreatingForm)}
        />
      </ButtonWrapper>
    </BodyContainer>
  );
};
const BodyContainer = styled.div`
  width: 40vw;
  max-height: 70vh;
  max-width: 30rem;
  padding: 1rem;
`;
const Wrapper = styled.div`
  margin-bottom: 2rem;
`;
const ToggleTitle = styled.span`
  width: 20%;
  font-size: 1rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const ToggleWrapper = styled.div`
  position: relative;
  margin: 0;
  overflow: hidden;
  margin-bottom: 1.5rem;
`;
const ToggleButtonInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const ToggleButtonWrapper = styled.label`
  position: relative;
  width: 45%;
  height: 2rem;
  background-color: ${darkTheme.adaptiveGrey500};
  border-radius: 4px;
  float: right;
  cursor: pointer;
  display: flex;
  align-self: flex-end;
  margin-bottom: 0.5rem;
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
  width: 48%;
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
  text-align: end;
  font-size: 0.5rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const RowDiv = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  float: right;
`;

const Select = styled.select`
  width: 100%;
  height: 2.5rem;
  background-color: ${darkTheme.adaptiveGrey500};
  border-radius: 4px;
  color: ${darkTheme.adaptiveGrey200};
  padding: 0 1rem;
  cursor: pointer;
`;
const Option = styled.option`
  &:hover {
    cursor: pointer;
  }
`;

export default MeetingModalBody;
