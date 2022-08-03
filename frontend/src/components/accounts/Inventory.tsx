import { useState } from "react";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import Modal from "components/commons/Modal";
import EmojiCard from "components/commons/EmojiCard";
import EnrollModalHeader from "./EnrollModalHeader";
import EnrollModalBody from "./EnrollModalBody";
import DetailModalBody from "./DetailModalBody";

export type DetailType = {
  emojiTitle: string;
  ARCode: string;
  author: string;
  description: string;
  isFav: boolean;
};

function Inventory() {
  const [isOwnItems, setIsOwnItems] = useState(true);
  const [isDisplayDetail, setIsDisplayDetail] = useState(false);
  const [detailInfo, setDetailInfo] = useState<DetailType>({
    emojiTitle: "",
    ARCode: "",
    author: "",
    description: "",
    isFav: false,
  });
  const [isDisplayEnroll, setIsDisplayEnroll] = useState(false);

  const switchIsDisplayEnroll = () => {
    setIsDisplayEnroll(!isDisplayEnroll);
  };
  const switchIsDisplayDetail = () => {
    setIsDisplayDetail(!isDisplayDetail);
  };

  const myOwnItems = [
    {
      emojiTitle: "불타는 아스날",
      ARCode: "",
      author: "Andrew",
      description: "아스날은 불타야 제맛이지",
      isFav: false,
    },
    {
      emojiTitle: "우리흥",
      ARCode: "",
      author: "Dijkstra",
      description: "으앙마",
      isFav: false,
    },
  ];

  const myFavorites = [
    {
      emojiTitle: "맨구",
      ARCode: "",
      author: "Andrew",
      description: "훈발놈",
      isFav: true,
    },
  ];

  return (
    <InventoryBox>
      {isDisplayEnroll && (
        <Modal
          header={<EnrollModalHeader />}
          body={<EnrollModalBody />}
          onDisplayChange={switchIsDisplayEnroll}
        />
      )}
      {isDisplayDetail && (
        <Modal
          header={
            <DetailHeader>
              <span>상세정보</span>
            </DetailHeader>
          }
          body={<DetailModalBody {...detailInfo} />}
          onDisplayChange={switchIsDisplayDetail}
        />
      )}
      <Info>
        <div>
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
              <span
                style={isOwnItems ? { color: darkTheme.mainBadgeColor } : {}}
              >
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
              <span
                style={isOwnItems ? {} : { color: darkTheme.mainBadgeColor }}
              >
                즐겨찾기
              </span>
            </SwitchItem>
          </InventorySwitches>
        </div>
        <div onClick={switchIsDisplayEnroll}>
          <EnrollBtn width={6} height={3} text={"이모지 등록"} />
        </div>
      </Info>
      <Hr />

      <InventoryContent>
        {isOwnItems
          ? myOwnItems.map((item) => {
              return (
                <div
                  onClick={() => {
                    switchIsDisplayDetail();
                    setDetailInfo(item);
                  }}
                >
                  <EmojiCard>
                    <></>
                  </EmojiCard>
                </div>
              );
            })
          : myFavorites.map((item) => {
              return (
                <div
                  onClick={() => {
                    switchIsDisplayDetail();
                    setDetailInfo(item);
                  }}
                >
                  <EmojiCard>
                    <></>
                  </EmojiCard>
                </div>
              );
            })}
      </InventoryContent>
    </InventoryBox>
  );
}

const InventoryBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 45rem;
  background-color: ${darkTheme.mainColor};
  border: 1px solid ${darkTheme.adaptiveGrey700};
  border-radius: 4px;
  margin: 0 0 0 3rem;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  &:hover {
    cursor: pointer;

    span {
      color: ${darkTheme.adaptiveGrey200};
    }
  }
`;

const EnrollBtn = styled(Button)`
  margin-right: 0.8rem;
  background-color: ${darkTheme.darkColor};

  &:hover {
    background-color: ${darkTheme.emphasisColor};
  }
`;

const Hr = styled.hr`
  background-color: ${darkTheme.adaptiveGrey700};
  border: 1px solid ${darkTheme.adaptiveGrey700};
  margin: 0;
`;

const InventoryContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(66px, auto));
  place-items: center start;
  justify-content: stretch;
  gap: 0.9rem;
  padding: 1.5rem;
`;

const DetailHeader = styled.h1`
  width: 20rem;
  margin: 1rem 0 1rem 0;
`;

export default Inventory;
