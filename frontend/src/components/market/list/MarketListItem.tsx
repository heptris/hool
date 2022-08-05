import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import defaultImg from "assets/profile-default-imgs/2.png";

import Button from "components/commons/Button";
import Card from "components/commons/Card";

const { adaptiveGrey700, adaptiveGrey800, mainColor } = darkTheme;

const MarketItem = () => {
  return (
    <Item bgColor={mainColor} borderColor={adaptiveGrey700}>
      <Emoji src={defaultImg} alt="" />
      <ItemTitle>Sample</ItemTitle>
      <ItemDesc>Lorem ipsum</ItemDesc>
      <BuyInfoWrapper>
        <CostsWrapper>
          <i className="fa-solid fa-cube"></i>
          <span>500</span>
        </CostsWrapper>
        <BuyButton height={2.75} width={3.75} fontSize={0.875} text={"구매"} />
      </BuyInfoWrapper>
    </Item>
  );
};
const Item = styled(Card)`
  position: relative;
  height: 28rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem;
`;
const Emoji = styled.img`
  margin-top: 3rem;
  height: 8rem;
  border-radius: 4px;
`;
const ItemTitle = styled.h3`
  margin-top: 1rem;
  font-size: 1.2rem;
`;
const ItemDesc = styled.p`
  margin-top: 2rem;
  height: 4rem;
  overflow: auto;
  word-wrap: break-word;
  text-align: center;
  max-width: 10rem;
  font-size: 1.1rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const BuyInfoWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
`;
const CostsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    margin-right: 0.5rem;
    color: ${darkTheme.emphasisColor};
  }

  span {
  }
`;
const BuyButton = styled(Button)`
  margin-top: 2rem;
  background-color: ${darkTheme.darkColor};

  &:hover {
    background-color: ${darkTheme.emphasisColor};
  }
`;
export default MarketItem;
