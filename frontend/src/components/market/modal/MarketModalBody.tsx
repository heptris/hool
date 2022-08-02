import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import Card from "components/commons/Card";
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
          </ItemList>
          <Button height={3} width={12} text={"등록하기"} marginTop={1.5} />
        </LeftContainer>
        <RightContainer>
          <InputWrapper>
            <LeftLabelInput
              text={"상품명"}
              info={"2~22자 내로 입력해주세요"}
              widthSize={"10rem"}
              placeholderText={"여기에 상품명을 적어주세요"}
            />
            <LabelInput
              text="판매금액"
              widthSize={"10rem"}
              placeholderText={"여기에 판매금액을 적어주세요"}
            />
          </InputWrapper>
          <LabelTextarea
            text="설명"
            placeholderText="여기에 설명을 적어주세요"
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
const LeftLabelInput = styled(LabelInput)`
  margin-right: 1rem;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default MarketModalBody;
