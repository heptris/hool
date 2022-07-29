import styled from "styled-components";

import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import { CostsWrapper, Icon } from "./MarketItem";

const { adaptiveGrey700 } = darkTheme;
const MarketHeader = () => {
  return (
    <Header>
      <div>
        <MarketTitle>이모지 구매하기</MarketTitle>
        <MarketDesc>이모지를 통해 당신의 기분을 친구와 공유해요!</MarketDesc>
        <MyPoint>
          <div>포인트</div>
          <MyPointWrapper>
            <Icon className="fa-solid fa-coins" />
            <span>1,237</span>
          </MyPointWrapper>
        </MyPoint>
      </div>
      <Button height={2.8} width={5} />
    </Header>
  );
};
const Header = styled.header`
  border-bottom: solid 1px ${adaptiveGrey700};
  padding-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MarketTitle = styled.h2`
  font-size: 2.5rem;
`;
const MarketDesc = styled.p`
  margin-top: 1rem;
`;
const MyPoint = styled.div`
  margin-top: 1.5rem;
`;
const MyPointWrapper = styled(CostsWrapper)`
  margin-top: 0.3rem;
`;
export default MarketHeader;
