import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import Card from "components/commons/Card";
import Form from "components/commons/Form";

const { adaptiveGrey700, adaptiveGrey800 } = darkTheme;

const MeetingModalBody = () => {
  return (
    <div>
      <Form text="응원방 제목" info={`0/140`} />
      <Button height={3} width={6} text={"등록하기"} marginTop={1.5} />
    </div>
  );
};
const LRContainer = styled.div`
  display: flex;
  padding: 3rem;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 3rem;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  justify-content: center;
  background-color: ${adaptiveGrey800};
  border: 1px solid ${adaptiveGrey700};
  padding: 1rem;
  height: 15rem;
  overflow: auto;
`;
const EmojiCard = styled(Card)`
  width: 4rem;
  height: 4rem;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export default MeetingModalBody;
