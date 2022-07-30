import styled from "styled-components";

import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import { CostsWrapper, Icon } from "./MarketItem";
import { InputStyle } from "components/commons/Form";

const { adaptiveGrey700 } = darkTheme;
const MarketHeader = ({ onDisplayChange }: { onDisplayChange: Function }) => {
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
      <UtilWrapper>
        <InputWrapper>
          <MagniFyingIcon
            className="fa-solid fa-magnifying-glass"
            htmlFor="search"
          />
          <MarketInput placeholder={"이모지 검색"} id="search" />
        </InputWrapper>
        <MarketButton
          height={2.8}
          width={5}
          text={"상품등록"}
          onClick={onDisplayChange}
        />
      </UtilWrapper>
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
const UtilWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 8rem;
`;
const InputWrapper = styled.div`
  position: relative;
`;
const MagniFyingIcon = styled.label`
  position: absolute;
  left: 1rem;
  top: 1rem;
`;
const MarketInput = styled.input`
  ${InputStyle}
  width: 20rem;
  height: 2.8rem;
  margin: 0;
  padding-left: 3rem;
`;
const MarketButton = styled(Button)<{ onClick: Function }>``;
export default MarketHeader;
