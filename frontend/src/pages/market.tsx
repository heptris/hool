import { useState } from "react";

import Container from "components/commons/Container";
import { MarketHeader, MarketList, MarketModal } from "components/market";

const MarketPage = () => {
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const onDisplayChange = () => {
    setIsDisplayModal(!isDisplayModal);
  };
  return (
    <Container>
      <MarketHeader
        onDisplayChange={onDisplayChange}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <MarketList searchKeyword={searchKeyword} />
      {isDisplayModal && <MarketModal onDisplayChange={onDisplayChange} />}
    </Container>
  );
};

export default MarketPage;
