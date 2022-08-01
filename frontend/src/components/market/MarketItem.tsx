import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import defaultImg from "assets/profile-default-imgs/6.jpg";

import Button from "components/commons/Button";
import Card from "components/commons/Card";

const { adaptiveGrey700, adaptiveGrey800 } = darkTheme;

const MarketItem = () => {
  return (
    <Item bgColor={adaptiveGrey800} borderColor={adaptiveGrey700}>
      <Emoji src={defaultImg} alt="" />
      <ItemTitle>구글 이미지</ItemTitle>
      <ItemDesc>테스트용 구글 이미지입니다</ItemDesc>
      <BuyInfoWrapper>
        <CostsWrapper>
          <Icon className="fa-solid fa-sack-dollar" />
          <span>500</span>
        </CostsWrapper>
        <BuyButton height={2.75} width={3.75} fontSize={0.875} text={"구매"} />
      </BuyInfoWrapper>
    </Item>
  );
};
const Item = styled(Card)`
  position: relative;
  width: 18vw;
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem;
`;
const Emoji = styled.img`
  margin-top: 3rem;
  height: 8rem;
`;
const ItemTitle = styled.h3`
  margin-top: 1rem;
`;
const ItemDesc = styled.p`
  margin-top: 2rem;
  height: 4rem;
  overflow: auto;
  word-wrap: break-word;
  text-align: center;
  max-width: 10rem;
`;
const BuyInfoWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
`;
export const CostsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled.i`
  margin-right: 0.4rem;
`;
const BuyButton = styled(Button)`
  margin-top: 2rem;
`;
export default MarketItem;
