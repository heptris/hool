import { useState } from "react";

import Container from "components/commons/Container";
import { MarketHeader, MarketList, MarketModal } from "components/market";

const MarketPage = () => {
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const onDisplayChange = () => {
    setIsDisplayModal(!isDisplayModal);
  };
  return (
    <Container>
      <MarketHeader onDisplayChange={onDisplayChange} />
      <MarketList />
      {isDisplayModal && <MarketModal onDisplayChange={onDisplayChange} />}
    </Container>
  );
};

export default MarketPage;
