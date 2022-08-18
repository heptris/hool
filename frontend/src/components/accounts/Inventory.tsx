import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyEmojiList, getMyFavoriteEmoji } from "api/profile";
import { QUERY_KEYS, ROUTES_NAME } from "constant";

import { Navigate } from "@tanstack/react-location";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import type { EmojiDetailType } from "types/EmojiDetailType";
import Button from "components/commons/Button";
import Modal from "components/commons/Modal";
import EmojiCard from "components/commons/EmojiCard";
import EnrollModalHeader from "./EnrollModalHeader";
import EnrollModalBody from "./EnrollModalBody";
import DetailModalBody from "./DetailModalBody";
import Loading from "components/Loading";
import Alert from "components/commons/Alert";

const ALERT_DISPLAYING_TIME = 4000;

function Inventory() {
  const [isOwnItems, setIsOwnItems] = useState(true);
  const [isDisplayDetail, setIsDisplayDetail] = useState(false);
  const [detailInfo, setDetailInfo] = useState<EmojiDetailType>({
    emojiId: 0,
    emojiUrl: "",
    name: "",
    description: "",
    emojiAnimate: "",
    memberEmojiId: 0,
    isFavorite: false,
    ARCode: "",
  });
  const [isDisplayEnroll, setIsDisplayEnroll] = useState(false);
  const [isDisplayAlert, setIsDisplayAlert] = useState(false);
  const [msgToDisplay, setMsgToDisplay] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const switchIsDisplayEnroll = () => {
    setIsDisplayEnroll(!isDisplayEnroll);
  };
  const switchIsDisplayDetail = () => {
    setIsDisplayDetail(!isDisplayDetail);
  };

  const {
    data: myOwnEmojiList,
    isError: myOwnEmojiListIsError,
    isLoading: myOwnEmojiListIsLoading,
  } = useQuery([QUERY_KEYS.MY_OWN_EMOJI_LIST], getMyEmojiList, {
    retry: 0,
  });
  const {
    data: myFavEmojiList,
    isError: myFavEmojiListIsError,
    isLoading: myFavEmojiListIsLoading,
  } = useQuery([QUERY_KEYS.MY_FAV_EMOJI_LIST], getMyFavoriteEmoji, {
    retry: 0,
  });

  if (myOwnEmojiListIsLoading || myFavEmojiListIsLoading) return <Loading />;
  if (myOwnEmojiListIsError || myFavEmojiListIsError)
    return <Navigate to={ROUTES_NAME.ERROR} />;

  const handleDisplayAlert = (message: string, success: boolean) => {
    setIsDisplayAlert(true);
    setMsgToDisplay(message);
    setIsSuccess(success);
  };

  return (
    <>
      {isDisplayAlert && (
        <Alert
          displayTimeInMs={ALERT_DISPLAYING_TIME}
          handleDisplayAlert={setIsDisplayAlert}
          isDisplayAlert={isDisplayAlert}
          msgToDisplay={msgToDisplay}
          isSuccess={isSuccess}
        />
      )}
      <InventoryBox>
        {isDisplayEnroll && (
          <Modal
            header={<EnrollModalHeader />}
            body={
              <EnrollModalBody
                onDisplayChange={(message: string, success: boolean) => {
                  switchIsDisplayEnroll();
                  handleDisplayAlert(message, success);
                }}
              />
            }
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
            body={
              <DetailModalBody
                {...detailInfo}
                onChangeDetailInfo={setDetailInfo}
              />
            }
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
            ? myOwnEmojiList?.data.map((item: EmojiDetailType, i: number) => (
                <div
                  key={i}
                  onClick={() => {
                    setDetailInfo(item);
                    switchIsDisplayDetail();
                  }}
                >
                  <EmojiCard emojiUrl={item.emojiUrl} />
                </div>
              ))
            : myFavEmojiList?.data.map((item: EmojiDetailType, i: number) => (
                <div
                  key={i}
                  onClick={() => {
                    setDetailInfo(item);
                    switchIsDisplayDetail();
                  }}
                >
                  <EmojiCard emojiUrl={item.emojiUrl} />
                </div>
              ))}
        </InventoryContent>
      </InventoryBox>
    </>
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
  margin: 1.5rem 1rem 1rem 0.5rem;
`;

export default Inventory;
