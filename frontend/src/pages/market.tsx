import { useState } from "react";

import styled from "styled-components";

import { MarketHeader, MarketItemList, MarketModal } from "components/market";

const MarketPage = () => {
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const onDisplayChange = () => {
    setIsDisplayModal(!isDisplayModal);
  };
  return (
    <MarketContainer>
      <MarketHeader onDisplayChange={onDisplayChange} />
      <MarketItemList />
      {isDisplayModal && <MarketModal onDisplayChange={onDisplayChange} />}
    </MarketContainer>
  );
};
const MarketContainer = styled.section`
  margin-top: 7rem;
  width: 90%;
`;

export default MarketPage;
