import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyFavoriteEmoji } from "api/profile";
import { QUERY_KEYS } from "constant";

import { useSelector, useDispatch } from "react-redux";
import { setMsgToSend, setIsDisplayEmoji } from "store";

import styled from "styled-components";
import { darkTheme, IconStyle, InputStyle } from "styles";

import type { RootState } from "store";
import type { EmojiDetailType } from "types/EmojiDetailType";

import Button from "components/commons/Button";
import EmojiCard from "components/commons/EmojiCard";

type PropsType = {
  sendEmojiSignal: Function;
  sendTextMessage: Function;
};

const MeetingMessageInput = (props: PropsType) => {
  const { sendEmojiSignal, sendTextMessage } = props;
  const dispatch = useDispatch();
  const { msgToSend, isDisplayEmoji } = useSelector(
    (state: RootState) => state.clientSession
  );

  // React Query 상태
  const {
    data: myFavEmojiList,
    isError: myFavEmojiListIsError,
    isLoading: myFavEmojiListIsLoading,
  } = useQuery([QUERY_KEYS.MY_FAV_EMOJI_LIST], getMyFavoriteEmoji, {
    retry: 0,
  });

  const onChangeMsgToSend = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMsgToSend(e.target.value));
  };

  return (
    <Container>
      {isDisplayEmoji && (
        <EmojiModal className={"animate__animated animate__bounceIn"}>
          <ModalText>이모지 즐겨찾기 목록</ModalText>
          <Hr />
          <GridWrapper>
            <ModalGrid>
              {myFavEmojiList?.data.map((item: EmojiDetailType, i: number) => (
                <div key={i} onClick={() => sendEmojiSignal(item)}>
                  <EmojiCard emojiUrl={item.emojiUrl} />
                </div>
              ))}
            </ModalGrid>
          </GridWrapper>
        </EmojiModal>
      )}
      <MessageBox>
        <IconBox>
          <Left>
            <Icon
              className="fa-solid fa-face-meh"
              onClick={() => {
                dispatch(setIsDisplayEmoji(!isDisplayEmoji));
              }}
            />
            {/* <Icon className="fa-solid fa-microphone" />
            <Icon className="fa-solid fa-bell" /> */}
          </Left>
          <div>
            <Icon className="fa-solid fa-circle-info"></Icon>
          </div>
        </IconBox>
        <MsgForm
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            sendTextMessage(msgToSend);
          }}
        >
          <Input
            type="text"
            placeholder={"Type to write a message"}
            height="2.25rem"
            widthSize="100%"
            value={msgToSend}
            onChange={onChangeMsgToSend}
          />
          <div
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              sendTextMessage(msgToSend);
            }}
          >
            <Button
              CSSProps={"position:absolute; top: 0.2rem; right:0.2rem"}
              text="Send"
              width={3.75}
              height={1.875}
              fontSize={0.875}
            />
          </div>
        </MsgForm>
      </MessageBox>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  overflow: visible;
`;
const Input = styled.input`
  ${InputStyle}
`;
export const MessageBox = styled.div`
  width: 24.5rem;
  height: 6.125rem;
  margin: 1rem 0.5rem 0 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 1rem;
  background-color: ${darkTheme.mainColor};
`;
const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Left = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
`;
const Icon = styled.i`
  ${IconStyle}
  margin-bottom: 0.75rem;

  &:hover {
    cursor: pointer;
    color: ${darkTheme.adaptiveGrey500};
  }
`;
const MsgForm = styled.form`
  width: 100%;
  position: relative;
`;
const EmojiModal = styled.div`
  background-color: ${darkTheme.bgColor};
  width: 24rem;
  border: 1px solid ${darkTheme.adaptiveGrey800};
  border-radius: 4px;
  position: absolute;
  bottom: 2rem;
  left: calc(3rem - 100%);
  padding: 0.5rem 0.5rem;
  box-sizing: border-box;
  z-index: 5001;
`;
const GridWrapper = styled.div`
  overflow: auto;
  height: 8rem;
`;
const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem 0.2rem;
`;
const ModalText = styled.h1``;
const Hr = styled.hr`
  border: 1px solid ${darkTheme.adaptiveGrey700};
  background-color: ${darkTheme.adaptiveGrey700};
  width: 100%;
`;

export default MeetingMessageInput;
