import styled from "styled-components";

import PageHeader from "components/commons/PageHeader";
import Button from "components/commons/Button";
import { darkTheme } from "styles";

const MarketHeader = ({ onDisplayChange }: { onDisplayChange: Function }) => {
  return (
    <PageHeader
      pageTitle="이모지 구매하기"
      subtext="이모지를 통해 당신의 기분을 친구와 공유해요!"
      isDisplaySearchBar={true}
      searchPlaceholder="이모지 검색"
      isDisplayBtn={true}
      concreteBtn={
        <MarketButton
          height={2.8}
          width={7}
          text={"상품등록"}
          onClick={onDisplayChange}
        />
      }
      isDisplayInfo={true}
      concreteInfo={
        <MyPointBox>
          <div>큐브</div>
          <MyPoint>
            <i className="fa-solid fa-cube"></i>
            <span>1,237</span>
          </MyPoint>
        </MyPointBox>
      }
    />
  );
};
const MyPointBox = styled.div``;
const MyPoint = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;

  i {
    margin-right: 0.5rem;
    color: ${darkTheme.emphasisColor};
  }
`;
const MarketButton = styled(Button)<{ onClick: Function }>``;

export default MarketHeader;
