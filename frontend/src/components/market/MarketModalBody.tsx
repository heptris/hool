import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import Card from "components/commons/Card";
import LabelText from "./LabelText";

const { adaptiveGrey700, adaptiveGrey800 } = darkTheme;

const MarketModalBody = () => {
  return (
    <div>
      <LRContainer>
        <LeftContainer>
          <ItemList>
            <EmojiCard children={<></>} />
            <EmojiCard children={<></>} />
            <EmojiCard children={<></>} />
            <EmojiCard children={<></>} />
            <EmojiCard children={<></>} />
            <EmojiCard children={<></>} />
            <EmojiCard children={<></>} />
            <EmojiCard children={<></>} />
            <EmojiCard children={<></>} />
            <EmojiCard children={<></>} />
          </ItemList>
          <Button height={3} width={15} text={"등록하기"} marginTop={1.5} />
        </LeftContainer>
        <RightContainer>
          <InputWrapper>
            <LabelText
              contentName={"상품명"}
              isInput={true}
              placeholder={"상품명"}
              widthSize={"10rem"}
              marginRight={"1rem"}
            />
            <LabelText
              contentName="판매가격"
              isInput={true}
              placeholder={"판매가격"}
              widthSize={"10rem"}
            />
          </InputWrapper>
          <LabelText contentName="설명" isInput={false} />
        </RightContainer>
      </LRContainer>
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
  grid-gap: 0.5rem;
  justify-content: center;
  background-color: ${adaptiveGrey800};
  border: 1px solid ${adaptiveGrey700};
  padding: 0.5rem;
  height: 15rem;
  overflow: auto;
  border-radius: 4px;

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: ${darkTheme.mainColor};
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;
const EmojiCard = styled(Card)`
  width: 4rem;
  height: 4rem;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    outline: 2px solid ${darkTheme.mainBadgeColor};
    background-color: ${darkTheme.mainColor};
  }
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export default MarketModalBody;
