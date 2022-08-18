import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import { postBuyEmoji } from "api/market";

import Button from "components/commons/Button";
import Card from "components/commons/Card";

import { MarketItemType } from "types/MarketItemType";
import { QUERY_KEYS } from "constant";
import { AxiosError } from "axios";

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
  const { mutate } = useMutation(postBuyEmoji, {
    onSuccess: () => {
      alert("구매가 완료되었습니다.");
    },
    onError: (error: {
      response: { status: number; data: { message: string } };
    }) => {
      if (error.response.status === 409) {
        alert(error.response.data.message);
      } else if (error.response.status === 404) {
        alert("본인이 만든 이모티콘입니다.");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USER]);
    },
  });
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    if (isHovering === false) return;

    setTimeout(() => setIsHovering(false), 2000);
  }, [isHovering]);

  return (
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
