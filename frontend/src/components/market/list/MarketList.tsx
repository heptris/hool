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
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  row-gap: 2rem;
  column-gap: 1.5vw;
  margin-top: 2rem;
  justify-content: center;
`;

export default MarketList;
