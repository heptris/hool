import styled from "styled-components";

import MarketHeader from "../components/market/MarketHeader";
import MarketItemList from "../components/market/MarketItemList";

const MarketPage = () => {
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

export default MarketPage;
