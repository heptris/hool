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
  grid-template-columns: repeat(auto-fit, 18rem);
  grid-gap: 2rem;
  margin-top: 5rem;
  justify-content: center;
`;

export default MarketItemList;
