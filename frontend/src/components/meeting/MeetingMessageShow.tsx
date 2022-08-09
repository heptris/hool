import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { addChatEvents } from "store";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import profileDefaultImg from "assets/profile-default-imgs/1.png";

import type { SessionStateType } from "./MeetingRoom";

import { MessageBox } from "./MeetingMessageInput";
import { IconStyle } from "styles/IconStyle";

type PropsType = {
  sessionState: SessionStateType;
};
type SComponentPropsType = {
  isShowingGame?: boolean;
};

function MeetingMessageShow(props: PropsType) {
  const dispatch = useDispatch();
  // Redux 상태
  const isShowingGame = useSelector(
    (state: RootState) => state.navbar.isShowingGame
  );
  const { myUserName, chatEvents } = useSelector(
    (state: RootState) => state.clientSession
  );

  // 상위 컴포넌트 세션상태
  const { session, subscribers } = props.sessionState;
  useEffect(() => {
    if (session !== undefined) {
      recvSignal();
    }
  }, [session]);

  const msgBodyRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const scrollToBottom: React.RefObject<HTMLDivElement> = React.useRef(null);

  const recvSignal = () => {
    const mySession = session;

    mySession.on("signal:chat", (event: any) => {
      console.log(event.from);
      console.log(event.type);

      console.log(chatEvents);
      dispatch(addChatEvents(event.data));
    });
  };

  const renderChatMsgs = (chatEvent: string, idx: number) => {
    const [sender, msg] = chatEvent.split("::");

    if (sender === myUserName) {
      return createOppositeBubble({ sender, msg, idx });
    } else {
      return createOppositeBubble({ sender, msg, idx });
    }
  };

  const createMyBubble = ({
    sender,
    msg,
    idx,
  }: {
    sender: string;
    msg: string;
    idx: number;
  }) => {};

  const createOppositeBubble = ({
    sender,
    msg,
    idx,
  }: {
    sender: string;
    msg: string;
    idx: number;
  }) => (
    <SpeechBubble key={idx}>
      <ProfileImg src={profileDefaultImg} alt={`${sender}의 프로필 이미지`} />
      <MessageContent>
        <NickName>{sender}</NickName>
        <MessageText>
          <span>{msg}</span>
        </MessageText>
      </MessageContent>
    </SpeechBubble>
  );

  return (
    <>
      <MessageShowHeader isShowingGame={isShowingGame}>
        <Icon className="fa-solid fa-comment" />
        <h1>Chat</h1>
      </MessageShowHeader>
      <MessageShowBody ref={msgBodyRef} isShowingGame={isShowingGame}>
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
  margin-top: ${(props: SComponentPropsType) =>
    props.isShowingGame ? "1rem" : "0rem"}; //  게임 컴포넌트 없을때,
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MessageShowBody = styled(MessageBox)`
  margin-top: 0rem;
  height: ${(props: SComponentPropsType) =>
    props.isShowingGame ? "52%" : "100%"}; //게임 컴포넌트 없을때,
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: ${darkTheme.adaptiveGrey800};
  transition: height 0.3s ease;
  overflow-y: auto;
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
`;
const ProfileImg = styled.img`
  width: 2.5rem;
  border-radius: 4px;
  margin-right: 1rem;
`;
const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
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

  background-color: ${darkTheme.adaptiveGrey700};
  border-radius: 8px;

  span {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`;

export default MeetingMessageShow;
