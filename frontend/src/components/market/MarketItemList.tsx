import styled from "styled-components";

import MarketItem from "components/market/MarketItem";

const MarketItemList = () => {
  return (
    <ItemList>
      <MarketItem />
      <MarketItem />
      <MarketItem />
      <MarketItem />
      <MarketItem />
      <MarketItem />
      <MarketItem />
    </ItemList>
  );
};
const ItemList = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
  margin-top: 5rem;
`;

export default MarketItemList;
