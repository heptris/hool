import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import EmojiCard from "components/commons/EmojiCard";
import LabelInput from "components/commons/LabelInput";
import LabelTextarea from "components/commons/LabelTextarea";

const { adaptiveGrey700, adaptiveGrey800 } = darkTheme;

const MarketModalBody = () => {
  return (
    <>
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
            <LeftLabelInput
              text={"상품명"}
              info={"2~22자 내로 입력해주세요"}
              widthSize={"10rem"}
              placeholderText={"상품명을 적어주세요"}
            />
            <LabelInput
              text="판매금액"
              widthSize={"10rem"}
              placeholderText={"판매금액을 적어주세요"}
            />
          </InputWrapper>
          <LabelTextarea
            text="설명"
            placeholderText="여기에 설명을 적어주세요"
            height="100%"
            width="100%"
          />
        </RightContainer>
      </LRContainer>
    </>
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
const LeftLabelInput = styled(LabelInput)`
  margin-right: 1rem;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default MarketModalBody;
