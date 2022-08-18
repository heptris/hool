import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBuyEmoji } from "api/market";
import { QUERY_KEYS } from "constant";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Alert from "components/commons/Alert";
import Button from "components/commons/Button";
import Card from "components/commons/Card";

import type { MarketItemType } from "types/MarketItemType";

const ANIMATION_DISPLAYING_TIME = 2000;
const ALERT_DISPLAYING_TIME = 4000;
const { adaptiveGrey700, adaptiveGrey800, mainColor } = darkTheme;

const MarketItem = (props: MarketItemType) => {
  const {
    emojiId,
    price,
    description,
    emojiAnimate,
    // emojiUrl,
    name,
    emojiUrl,
    creatorId,
    emojiShopId,
  } = props;

  const queryClient = useQueryClient();
  /* Alert 보일러플레이트 */
  const [isDisplayAlert, setIsDisplayAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msgToDisplay, setMsgToDisplay] = useState("");
  const { mutate } = useMutation(postBuyEmoji, {
    onSuccess: () => {
      // alert("구매가 완료되었습니다.");
      setIsDisplayAlert(true);
      setIsSuccess(true);
      setMsgToDisplay("구매 성공!");
    },
    onError: (error: {
      response: { status: number; data: { message: string } };
    }) => {
      if (error.response.status === 409) {
        // alert(error.response.data.message);
        setIsDisplayAlert(true);
        setIsSuccess(false);
        setMsgToDisplay("이미 소유중인 이모지에요!");
      } else if (error.response.status === 404) {
        // alert("본인이 만든 이모티콘입니다.");
        setIsDisplayAlert(true);
        setIsSuccess(false);
        setMsgToDisplay("내가 만든 이모지네요!");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USER]);
    },
  });
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    if (isHovering === false) return;

    setTimeout(() => setIsHovering(false), ANIMATION_DISPLAYING_TIME);
  }, [isHovering]);

  return (
    <>
      {isDisplayAlert && (
        <Alert
          isDisplayAlert={isDisplayAlert}
          handleDisplayAlert={setIsDisplayAlert}
          displayTimeInMs={ALERT_DISPLAYING_TIME}
          msgToDisplay={msgToDisplay}
          isSuccess={isSuccess}
        />
      )}
      <Item bgColor={mainColor} borderColor={adaptiveGrey700}>
        <Emoji
          src={emojiUrl}
          alt={name}
          onMouseEnter={() => setIsHovering(true)}
          className={isHovering ? `animate__animated ${emojiAnimate}` : ""}
        />
        <ItemTitle>{name}</ItemTitle>
        <ItemDesc>{description}</ItemDesc>
        <BuyInfoWrapper>
          <CostsWrapper>
            <i className="fa-solid fa-cube" />
            <span>
              {Number(price)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </CostsWrapper>
          <BuyButton
            height={2.75}
            width={3.75}
            fontSize={0.875}
            text={"구매"}
            buttonOnClick={() =>
              mutate({
                emojiShopId,
                sellerMemberId: creatorId,
              })
            }
          />
        </BuyInfoWrapper>
      </Item>
    </>
  );
};
const Item = styled(Card)`
  position: relative;
  height: 28rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem;
`;
const Emoji = styled.img`
  margin-top: 3rem;
  height: 8rem;
  border-radius: 4px;
`;
const ItemTitle = styled.h3`
  margin-top: 1rem;
  font-size: 1.2rem;
`;
const ItemDesc = styled.p`
  margin-top: 2rem;
  height: 4rem;
  overflow: auto;
  word-wrap: break-word;
  text-align: center;
  max-width: 10rem;
  font-size: 1.1rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const BuyInfoWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
`;
const CostsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    margin-right: 0.5rem;
    color: ${darkTheme.emphasisColor};
  }

  span {
  }
`;
const BuyButton = styled(Button)`
  margin-top: 2rem;
  background-color: ${darkTheme.darkColor};

  &:hover {
    background-color: ${darkTheme.emphasisColor};
  }
`;
export default MarketItem;
