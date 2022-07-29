import styled from "styled-components";

import MarketHeader from "./MarketHeader";
import MarketItemList from "./MarketItemList";

const MarketView = () => {
  return (
    <MarketContainer>
      <MarketHeader />
      <MarketItemList />
    </MarketContainer>
  );
};
const MarketContainer = styled.section`
  margin-top: 7rem;
`;

export default MarketView;
