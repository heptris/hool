import React, { useEffect, useState } from "react";
import { Navigate } from "@tanstack/react-location";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import styled from "styled-components";

import { getMarketListPage, getMarketRankList } from "api/market";

import Loading from "components/Loading";
import MarketListItem from "./MarketListItem";

import { QUERY_KEYS, ROUTES_NAME } from "constant";

import type { MarketItemType } from "types/MarketItemType";
import type { UserInfoType } from "types/UserInfoType";

const { MARKET_SEARCHED_LIST } = QUERY_KEYS;

const MarketList = ({
  searchKeyword,
  isTopTen,
  userInfo,
}: {
  searchKeyword: string;
  isTopTen: boolean;
  userInfo?: UserInfoType;
}) => {
  const { ref, inView } = useInView();
  const [size, setSize] = useState(4);
  const queryClient = useQueryClient();
  const { data: searchedList } = useQuery<MarketItemType[]>([
    MARKET_SEARCHED_LIST,
  ]);
  const {
    data: wholeList,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [QUERY_KEYS.MARKET],
    ({ pageParam }) =>
      getMarketListPage({ pageParam, size }).then((res) => res.data),
    {
      getNextPageParam: (lastPageRes) => lastPageRes.cursorId,
      retry: 1,
    }
  );
  const { data: topTenList } = useQuery(
    [QUERY_KEYS.MARKET_RANK_LIST],
    getMarketRankList
  );

  useEffect(() => {
    if (inView) {
      hasNextPage && !isFetchingNextPage && fetchNextPage();
    }
  }, [inView]);
  useEffect(() => {
    !searchKeyword && queryClient.setQueryData([MARKET_SEARCHED_LIST], null);
  }, [searchKeyword]);

  if (isLoading) return <Loading />;
  if (!userInfo) return <Navigate to={ROUTES_NAME.LOGIN} />;
  if (isError) return <Navigate to={ROUTES_NAME.ERROR} />;

  return (
    <ItemList>
      {isTopTen ? (
        <>
          {topTenList?.data.map((el: MarketItemType) => {
            return <MarketListItem key={el.emojiShopId} {...el} />;
          })}
        </>
      ) : (
        <>
          {searchKeyword ? (
            <>
              {searchedList?.map((el: MarketItemType) => {
                return <MarketListItem key={el.emojiShopId} {...el} />;
              })}
            </>
          ) : (
            <>
              {wholeList?.pages.map((page, i) => (
                <React.Fragment key={i}>
                  {page.values.map((el: MarketItemType) => {
                    return <MarketListItem key={el.emojiShopId} {...el} />;
                  })}
                </React.Fragment>
              ))}
            </>
          )}
          <div ref={ref} />
        </>
      )}
    </ItemList>
  );
};

const ItemList = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  row-gap: 2rem;
  column-gap: 1.5vw;
  margin-top: 2rem;
  justify-content: center;
`;

export default MarketList;
