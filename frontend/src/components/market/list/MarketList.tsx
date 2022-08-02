import styled from "styled-components";

import MarketListItem from "./MarketListItem";

const MarketList = () => {
  return (
    <ItemList>
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
      <MarketListItem />
    </ItemList>
  );
};
const ItemList = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 18rem);
  grid-gap: 2rem;
  margin-top: 5rem;
  justify-content: center;
`;

export default MarketList;
