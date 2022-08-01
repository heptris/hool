import Button from "components/commons/Button";
import Input from "components/commons/Input";
import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const MessageBox = styled.div`
  width: 25rem;
  height: 6.125rem;
  margin-top: 2.5rem;
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
  font-size: 1rem;
  color: ${darkTheme.adaptiveGrey200};
  margin-bottom: 0.75rem;
  margin-right: 0.75rem;
`;

const BtnBox = styled.div`
  width: 100%;
  position: relative;
`;

const MeetingMessage = () => {
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
      <BtnBox>
        <Input
          text="text"
          placeholderText="Type to write a message"
          height="2.25rem"
          widthSize="100%"
        />
        <Button
          CSSProps={"position:absolute; top: 0.2rem; right:0.2rem"}
          text="Send"
          width={3.75}
          height={1.875}
          marginLeft={0.5}
          fontSize={0.75}
        />
      </BtnBox>
    </MessageBox>
  );
};

export default MeetingMessage;
