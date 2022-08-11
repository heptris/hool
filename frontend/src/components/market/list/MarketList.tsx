import { Navigate } from "@tanstack/react-location";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";

import { getMarketList } from "api/market";

import Loading from "components/Loading";

import { QUERY_KEYS, ROUTES_NAME } from "constant";

import { MarketItemType } from "types/MarketItemType";
import { UserInfoType } from "types/UserInfoType";

import MarketListItem from "./MarketListItem";

const MarketList = () => {
  const queryClient = useQueryClient();
  const userInfo: UserInfoType | undefined = queryClient.getQueryData([
    QUERY_KEYS.USER,
  ]);
  console.log(userInfo);
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.MARKET],
    getMarketList,
    {
      retry: 0,
    }
  );

  if (isLoading) return <Loading />;
  if (!userInfo) return <Navigate to={ROUTES_NAME.LOGIN} />;
  if (isError) return <Navigate to={ROUTES_NAME.ERROR} />;

  return (
    <ItemList>
      {data.data.map((el: MarketItemType) => {
        return <MarketListItem key={el.emojiId} {...el} />;
      })}
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
