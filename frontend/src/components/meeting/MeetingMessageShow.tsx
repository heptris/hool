import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "store";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";
import { IconStyle } from "styles/IconStyle";

import { MessageBox } from "./MeetingMessageInput";

type PropsType = {
  recvSignal: Function;
};
type SComponentPropsType = {
  isShowingGame?: boolean;
};

function MeetingMessageShow(props: PropsType) {
  // Redux 상태
  const isShowingGame = useSelector(
    (state: RootState) => state.navbar.isShowingGame
  );
  const { myUserName, chatEvents } = useSelector(
    (state: RootState) => state.clientSession
  );

  const msgBodyRef: React.RefObject<HTMLDivElement> = React.useRef(null);

  const renderChatMsgs = (chatEvent: string, idx: number) => {
    const {
      myUserName: sender,
      msgToSend: msg,
      memberProfile: url,
    } = JSON.parse(chatEvent);

    if (sender === myUserName) {
      return createMyBubble({ sender, msg, idx, url });
    } else {
      return createOppositeBubble({ sender, msg, idx, url });
    }
  };
  const createMyBubble = ({
    sender,
    msg,
    idx,
    url,
  }: {
    sender: string;
    msg: string;
    idx: number;
    url: string;
  }) => {
    return (
      <SpeechBubble isMe={true} key={idx}>
        <ProfileImg src={url} alt={`${sender}의 프로필 이미지`} />
        <MessageContent isMe={true}>
          <NickName>{sender}</NickName>
          <MessageText>
            <span>{msg}</span>
          </MessageText>
        </MessageContent>
      </SpeechBubble>
    );
  };
  const createOppositeBubble = ({
    sender,
    msg,
    idx,
    url,
  }: {
    sender: string;
    msg: string;
    idx: number;
    url: string;
  }) => (
    <SpeechBubble key={idx}>
      <ProfileImg src={url} alt={`${sender}의 프로필 이미지`} />
      <MessageContent>
        <NickName>{sender}</NickName>
        <MessageText>
          <span>{msg}</span>
        </MessageText>
      </MessageContent>
    </SpeechBubble>
  );
  const scrollToBottom = () => {
    const msgBody: HTMLDivElement | null = msgBodyRef.current;
    if (msgBody instanceof HTMLDivElement) {
      msgBody.scrollTop = msgBody.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatEvents]);

  return (
    <>
      <MessageShowHeader>
        <Icon className="fa-solid fa-comment" />
        <h1>Chat</h1>
      </MessageShowHeader>
      <MessageShowBody id={"showBody"} ref={msgBodyRef}>
        {chatEvents.map((chat, i) => renderChatMsgs(chat, i))}
      </MessageShowBody>
    </>
  );
}

const MessageShowHeader = styled(MessageBox)`
  height: 3rem;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: ${darkTheme.mainColor};
  margin-top: 0rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MessageShowBody = styled(MessageBox)`
  margin-top: 0rem;
  height: 100%;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: ${darkTheme.adaptiveGrey800};
  transition: height 0.3s ease;
  overflow: hidden auto;
  word-break: break-all;
  position: relative;
`;
const Icon = styled.i`
  ${IconStyle}
  font-size: 1rem;
  margin-right: 1rem;
`;
const SpeechBubble = styled.div`
  margin-bottom: 0.5rem;
  height: fit-content;
  display: flex;
  align-items: center;
  ${({ isMe }: { isMe?: boolean }) => isMe && "flex-direction: row-reverse;"};
`;
const ProfileImg = styled.img`
  width: 2.5rem;
  border-radius: 4px;
  margin: 0 0.5rem;
`;
const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  ${({ isMe }: { isMe?: boolean }) => isMe && "align-items: flex-end;"};
`;
const NickName = styled.h1`
  font-size: 0.9rem;
  color: ${darkTheme.adaptiveGrey500};
  margin-bottom: 0.2rem;
  margin-left: 0.1rem;
`;
const MessageText = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;

  background-color: ${darkTheme.adaptiveGrey700};
  border-radius: 8px;

  span {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`;

export default MeetingMessageShow;
