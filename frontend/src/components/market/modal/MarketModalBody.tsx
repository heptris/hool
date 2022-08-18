import React, { useState } from "react";
import { Navigate } from "@tanstack/react-location";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMarketMakeList, postMarketItem } from "api/market";
import { QUERY_KEYS, ROUTES_NAME } from "constant";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import EmojiCard from "components/commons/EmojiCard";
import LabelInput from "components/commons/LabelInput";
import Loading from "components/Loading";

const { adaptiveGrey700, adaptiveGrey800 } = darkTheme;

interface UploadItemType {
  emojiId: number;
  name: string;
  emojiUrl: string;
  description: string;
  emojiAnimate: string;
  creatorId: number;
  price?: number;
}

const MarketModalBody = () => {
  const queryClient = useQueryClient();
  const [uploadItemInfo, setUploadItemInfo] = useState<UploadItemType>({
    emojiId: 0,
    name: "",
    emojiUrl: "",
    description: "",
    emojiAnimate: "",
    creatorId: 0,
    price: 0,
  });
  const {
    data: canUploadData,
    isError: canUploadIsError,
    isLoading: canUploadIsLoading,
  } = useQuery([QUERY_KEYS.MARKET_UPLOAD_ITEM], getMarketMakeList);

  if (canUploadIsLoading) return <Loading />;
  if (canUploadIsError) return <Navigate to={ROUTES_NAME.ERROR} />;

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setUploadItemInfo({
      ...uploadItemInfo,
      price: parseInt(e.target.value),
    });
  };
  const enrollEmojiForMarket = (e: React.MouseEvent) => {
    e.preventDefault();
    if (uploadItemInfo.price === undefined || isNaN(uploadItemInfo.price))
      return;
    if (uploadItemInfo.emojiId === 0) return;

    postMarketItem({
      emojiId: uploadItemInfo.emojiId,
      price: uploadItemInfo.price,
    })
      .then(() => {
        queryClient.invalidateQueries([QUERY_KEYS.MARKET_UPLOAD_ITEM]);
        queryClient.invalidateQueries([QUERY_KEYS.MARKET]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <LRContainer>
        <LeftContainer>
          <ItemList>
            {canUploadData.data.map((emo: UploadItemType) => (
              <div
                onClick={() => {
                  setUploadItemInfo(emo);
                }}
              >
                <EmojiCard key={emo.emojiId} emojiUrl={emo.emojiUrl} />
              </div>
            ))}
          </ItemList>
          <Button
            height={3}
            width={14.5}
            text={"등록하기"}
            marginTop={1.5}
            buttonOnClick={enrollEmojiForMarket}
          />
        </LeftContainer>
        <RightContainer>
          <PreviewDivision>
            {uploadItemInfo.emojiUrl !== "" ? (
              <NonClickableEmojiCard emojiUrl={uploadItemInfo.emojiUrl} />
            ) : null}
            <EmojiTitle>{uploadItemInfo.name}</EmojiTitle>
            <Description>{uploadItemInfo.description}</Description>
          </PreviewDivision>
          <InputWrapper>
            <LabelInput
              type="text"
              text="판매금액"
              widthSize={"14.5rem"}
              placeholderText={"판매금액을 적어주세요"}
              inputOnChange={onChangePrice}
            />
          </InputWrapper>
        </RightContainer>
      </LRContainer>
    </>
  );
};

const LRContainer = styled.div`
  display: flex;
  padding: 3rem;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 3rem;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ItemList = styled.div`
  padding: 0.5rem;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0.5rem;
  background-color: ${adaptiveGrey800};
  border: 1px solid ${adaptiveGrey700};
  border-radius: 4px;
  max-width: fit-content;
  min-width: 14.5rem;
  height: 14.5rem;
  overflow: auto;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: ${darkTheme.mainColor};
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;
const PreviewDivision = styled.div`
  width: 14.5rem;
  height: 14.5rem;
  background-color: ${darkTheme.darkColor};
  border: 1px solid ${darkTheme.adaptiveGrey800};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const NonClickableEmojiCard = styled(EmojiCard)`
  width: 6.25rem;
  height: 6.25rem;

  &:hover {
    cursor: default;
    outline: 0;
    background-color: ${darkTheme.darkColor};
  }
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.7rem;
`;
const EmojiTitle = styled.h1`
  margin-top: 1rem;
  font-size: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Description = styled.p`
  margin-top: 1.5rem;
  color: ${darkTheme.adaptiveGrey200};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default MarketModalBody;
