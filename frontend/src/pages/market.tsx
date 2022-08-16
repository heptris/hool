import { useState } from "react";

import Container from "components/commons/Container";
import { MarketHeader, MarketList, MarketModal } from "components/market";

const MarketPage = () => {
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const [isTopTen, setIsTopTen] = useState(true);
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
        setIsTopTen={setIsTopTen}
        isTopTen={isTopTen}
      />
      <MarketList searchKeyword={searchKeyword} isTopTen={isTopTen} />
      {isDisplayModal && <MarketModal onDisplayChange={onDisplayChange} />}
    </Container>
  );
};

export default MarketPage;
