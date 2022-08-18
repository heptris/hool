import { ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";
import { darkTheme } from "styles";

import { QUERY_KEYS } from "constant";

import PageHeader from "components/commons/PageHeader";
import Button from "components/commons/Button";
import SearchBar from "components/commons/SearchBar";

import { getMarketSearch } from "api/market";

import { UserInfoType } from "types/UserInfoType";

const { MARKET_SEARCHED_LIST } = QUERY_KEYS;

const MarketSearchBar = ({
  searchKeyword,
  setSearchKeyword,
}: {
  setSearchKeyword: Function;
  searchKeyword: string;
}) => {
  const queryClient = useQueryClient();
  const postSearchMutation = useMutation(getMarketSearch, {
    mutationKey: [MARKET_SEARCHED_LIST],
    onSuccess: (data) => {
      queryClient.setQueryData([MARKET_SEARCHED_LIST], data.data);
    },
  });
  const { mutate } = postSearchMutation;

  const handleSearchEmojiItem = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const onKeyPress = async (e: { key: string }) => {
    if (e.key === "Enter") mutate(searchKeyword);
  };

  return (
    <>
      <CustomSearchBar
        inputValue={searchKeyword}
        searchPlaceholder="이모지 검색"
        inputOnChange={handleSearchEmojiItem}
        onKeyPress={onKeyPress}
      />
    </>
  );
};
const CustomSearchBar = styled(SearchBar).attrs((props) => {
  onKeyPress: Function;
})``;
const MarketHeader = ({
  onDisplayChange,
  searchKeyword,
  setSearchKeyword,
  setIsTopTen,
  isTopTen,
  userInfo,
}: {
  onDisplayChange: Function;
  setSearchKeyword: Function;
  searchKeyword: string;
  setIsTopTen: Function;
  isTopTen: boolean;
  userInfo?: UserInfoType;
}) => {
  return (
    <PageHeader
      pageTitle="이모지 구매"
      subtext="이모지를 통해 당신의 기분을 친구와 공유해요!"
      isDisplaySearchBar={true}
      isDisplayBtn={true}
      SearchBar={
        isTopTen ? (
          <></>
        ) : (
          <MarketSearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        )
      }
      concreteBtn={
        <MarketButton
          height={2.8}
          width={7}
          text={"상품등록"}
          onClick={onDisplayChange}
        />
      }
      isDisplayInfo={true}
      concreteInfo={
        <InfoDivision>
          <MyPointBox>
            <div>보유 중인 큐브</div>
            <MyPoint>
              <i className="fa-solid fa-cube"></i>
              <span>
                {Number(userInfo?.point)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </MyPoint>
          </MyPointBox>
          <Switches>
            <SwitchItem
              style={
                isTopTen
                  ? {
                      background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                    }
                  : {}
              }
              onClick={() => {
                setIsTopTen(true);
              }}
            >
              <span style={isTopTen ? { color: darkTheme.mainBadgeColor } : {}}>
                Top 10
              </span>
            </SwitchItem>
            <SwitchItem
              style={
                isTopTen
                  ? {}
                  : {
                      background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                    }
              }
              onClick={() => {
                setIsTopTen(false);
              }}
            >
              <span style={isTopTen ? {} : { color: darkTheme.mainBadgeColor }}>
                전체 목록
              </span>
            </SwitchItem>
          </Switches>
        </InfoDivision>
      }
    />
  );
};
const MyPointBox = styled.div``;
const MyPoint = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;

  i {
    margin-right: 0.5rem;
    color: ${darkTheme.emphasisColor};
  }
`;
const MarketButton = styled(Button)<{ onClick: Function }>``;
const Switches = styled.div`
  display: flex;
  align-items: flex-end;
`;
const SwitchItem = styled.button`
  background-color: transparent;
  margin: 0 2rem 0 0;
  padding: 0 0 0.25rem 0;

  &:hover {
    cursor: pointer;

    span {
      color: ${darkTheme.adaptiveGrey200};
    }
  }
`;
const InfoDivision = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MarketHeader;
