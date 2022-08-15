import React, { useEffect, useState } from "react";
import { Navigate } from "@tanstack/react-location";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import styled from "styled-components";

import { getMarketListPage } from "api/market";

import Loading from "components/Loading";
import MarketListItem from "./MarketListItem";

import { QUERY_KEYS, ROUTES_NAME } from "constant";

import { MarketItemType } from "types/MarketItemType";
import { UserInfoType } from "types/UserInfoType";

const { USER, MARKET_SEARCHED_LIST } = QUERY_KEYS;

const MarketList = ({ searchKeyword }: { searchKeyword: string }) => {
  const { ref, inView } = useInView();
  const [size, setSize] = useState(4);
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<UserInfoType>([USER]);
  const { data: searchedList } = useQuery<MarketItemType[]>([
    MARKET_SEARCHED_LIST,
  ]);
  const {
    data,
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
    }
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
      {searchKeyword ? (
        <>
          {searchedList?.map((el: MarketItemType) => {
            return <MarketListItem key={el.emojiShopId} {...el} />;
          })}
        </>
      ) : (
        <>
          {data.pages.map((page) => (
            <React.Fragment key={page.nextId}>
              {page.values.map((el: MarketItemType) => {
                return <MarketListItem key={el.emojiShopId} {...el} />;
              })}
            </React.Fragment>
          ))}
        </>
      )}
      <div ref={ref} />
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
