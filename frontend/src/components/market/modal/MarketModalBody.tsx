import { Key, useState } from "react";
import { Navigate } from "@tanstack/react-location";
import { useQuery } from "@tanstack/react-query";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import { getMarketMakeList } from "api/market";

import { QUERY_KEYS, ROUTES_NAME } from "constant";

import Button from "components/commons/Button";
import EmojiCard from "components/commons/EmojiCard";
import LabelInput from "components/commons/LabelInput";
import LabelTextarea from "components/commons/LabelTextarea";
import Loading from "components/Loading";

const { adaptiveGrey700, adaptiveGrey800 } = darkTheme;

interface UploadItemType {
  creatorId: number;
  description: string;
  name: string;
  url: string;
  emojiId: number;
}

const MarketModalBody = () => {
  const [uploadItemInfo, setUploadItemInfo] = useState({
    name: "",
    price: "",
    description: "",
  });
  const {
    data: canUploadData,
    isError: canUploadIsError,
    isLoading: canUploadIsLoading,
  } = useQuery([QUERY_KEYS.MARKET_UPLOAD_ITEM], getMarketMakeList);

  if (canUploadIsLoading) return <Loading />;
  if (canUploadIsError) return <Navigate to={ROUTES_NAME.ERROR} />;

  console.log(canUploadData);

  const handleUploadItem = (el: UploadItemType) => {};

  return (
    <>
      <LRContainer>
        <LeftContainer>
          <ItemList>
            {canUploadData.data.map((el: UploadItemType) => {
              return <EmojiCard key={el.emojiId} emojiUrl={el.url} />;
            })}
          </ItemList>
          <Button height={3} width={15} text={"등록하기"} marginTop={1.5} />
        </LeftContainer>
        <RightContainer>
          <InputWrapper>
            <LabelInput
              text="판매금액"
              widthSize={"10rem"}
              placeholderText={"판매금액을 적어주세요"}
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5rem;
  justify-content: center;
  background-color: ${adaptiveGrey800};
  border: 1px solid ${adaptiveGrey700};
  padding: 0.5rem;
  height: 15rem;
  width: 100%;
  overflow: auto;
  border-radius: 4px;

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
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const EmojiItem = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
const EmojiImg = styled.img`
  height: 100%;
`;

export default MarketModalBody;
