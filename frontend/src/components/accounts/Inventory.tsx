import { useState } from "react";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";
import { letterSpacingSize } from "styles/GlobalStyle";

function Inventory() {
  const [isOwnItems, setIsOwnItems] = useState(true);
  const [isDisplayModal, setIsDisplayModal] = useState(false);

  const switchIsDisplayModal = () => {
    setIsDisplayModal(!isDisplayModal);
  };

  const MyOwnItems = [];

  const MyFavorites = [];

  return (
    <InventoryBox>
      <InventoryHeader>인벤토리</InventoryHeader>
      <InventorySwitches>
        <SwitchItem
          style={
            isOwnItems
              ? {
                  background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                }
              : {}
          }
          onClick={() => {
            setIsOwnItems(true);
          }}
        >
          <span style={isOwnItems ? { color: darkTheme.mainBadgeColor } : {}}>
            소유중
          </span>
        </SwitchItem>
        <SwitchItem
          style={
            isOwnItems
              ? {}
              : {
                  background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                }
          }
          onClick={() => {
            setIsOwnItems(false);
          }}
        >
          <span style={isOwnItems ? {} : { color: darkTheme.mainBadgeColor }}>
            즐겨찾기
          </span>
        </SwitchItem>
      </InventorySwitches>
      <Hr />

      <InventoryContent></InventoryContent>
    </InventoryBox>
  );
}

const InventoryBox = styled.div`
  width: 100%;
  min-height: 45rem;
  border: 1px solid ${darkTheme.adaptiveGrey700};
  border-radius: 4px;
  margin: 0 0 0 4rem;
  background-color: ${darkTheme.mainColor};
`;

const InventoryHeader = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.8rem 0 1.5rem 0.8rem;
`;

const InventorySwitches = styled.div`
  display: flex;
  margin: 0 0 0 0.8rem;
`;

const SwitchItem = styled.button`
  background-color: transparent;
  color: ${darkTheme.white};
  margin: 0 2rem 0 0;
  padding: 0 0 0.25rem 0;

  span {
    margin-right: ${letterSpacingSize}rem;
  }

  &:hover {
    cursor: pointer;

    span {
      color: ${darkTheme.adaptiveGrey200};
    }
  }
`;

const Hr = styled.hr`
  background-color: ${darkTheme.adaptiveGrey700};
  border: 1px solid ${darkTheme.adaptiveGrey700};
  margin: 0;
`;

const InventoryContent = styled.div`
  display: flex;
  width: 70%;
`;

export default Inventory;
