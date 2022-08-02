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
    </ItemList>
  );
};
const ItemList = styled.section`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  grid-gap: 2rem;
  margin-top: 3rem;
  justify-content: center;
`;

export default MarketItemList;
