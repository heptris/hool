import styled from "styled-components";
import { useState } from "react";

import { MarketHeader, MarketItemList, MarketModal } from "components/market";
import { Layout } from "components/layouts/Layout";

const MarketPage = () => {
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const onDisplayChange = () => {
    setIsDisplayModal(!isDisplayModal);
  };
  return (
    <Layout>
      <MarketContainer>
        <MarketHeader onDisplayChange={onDisplayChange} />
        <MarketItemList />
        {isDisplayModal && <MarketModal onDisplayChange={onDisplayChange} />}
      </MarketContainer>
    </Layout>
  );
};
const MarketContainer = styled.section`
  margin-top: 7rem;
  width: 90%;
`;

export default MarketPage;
