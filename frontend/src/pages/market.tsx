import { useState } from "react";

import styled from "styled-components";

import Container from "components/commons/Container";
import { MarketHeader, MarketItemList, MarketModal } from "components/market";

const MarketPage = () => {
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const onDisplayChange = () => {
    setIsDisplayModal(!isDisplayModal);
  };
  return (
    <Container>
      <MarketHeader onDisplayChange={onDisplayChange} />
      <MarketItemList />
      {isDisplayModal && <MarketModal onDisplayChange={onDisplayChange} />}
    </Container>
  );
};

export default MarketPage;
