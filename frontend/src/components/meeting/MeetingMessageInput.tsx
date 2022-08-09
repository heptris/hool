import { useSelector, useDispatch } from "react-redux";
import { setMsgToSend } from "store";

import styled from "styled-components";
import { darkTheme, IconStyle, InputStyle } from "styles";

import type { SessionStateType } from "./MeetingRoom";
import type { RootState } from "store";

import Button from "components/commons/Button";
import React from "react";

type PropsType = {
  sessionState: SessionStateType;
};

const MeetingMessageInput = (props: PropsType) => {
  const dispatch = useDispatch();
  const { myUserName, msgToSend, chatEvents } = useSelector(
    (state: RootState) => state.clientSession
  );
  const { session } = props.sessionState;

  const onChangeMsgToSend = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMsgToSend(e.target.value));
  };
  const sendTextMessage = () => {
    if (msgToSend.trim() === "") {
      return;
    }

    const mySession = session;

    mySession
      .signal({
        data: myUserName + "::" + msgToSend.trim(),
        to: [],
        type: "chat",
      })
      .then(() => {
        dispatch(setMsgToSend(""));
      })
      .catch((err: any) => console.error(err));
  };

  return (
    <MessageBox>
      <IconBox>
        <div>
          <Icon className="fa-solid fa-face-meh" />
          <Icon className="fa-solid fa-microphone" />
          <Icon className="fa-solid fa-bell" />
        </div>
        <div>
          <Icon className="fa-solid fa-circle-info"></Icon>
        </div>
      </IconBox>
      <MsgForm onSubmit={sendTextMessage}>
        <Input
          type="text"
          placeholder={"Type to write a message"}
          height="2.25rem"
          widthSize="100%"
          value={msgToSend}
          onChange={onChangeMsgToSend}
        />
        <div
          onClick={(e: React.FormEvent) => {
            e.preventDefault();
            sendTextMessage();
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
  );
};

const Input = styled.input`
  ${InputStyle}
`;
export const MessageBox = styled.div`
  width: 25rem;
  height: 6.125rem;
  margin-top: 1rem;
  margin-left: 1rem;
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
const Icon = styled.i`
  ${IconStyle}
  margin-bottom: 0.75rem;
  margin-right: 1rem;
`;
const MsgForm = styled.form`
  width: 100%;
  position: relative;
`;

export default MeetingMessageInput;
