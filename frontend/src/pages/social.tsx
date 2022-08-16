import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-location";

import { getFriendList, getFriendSendMessage } from "api/social";

import Container from "components/commons/Container";
import SocialHeader from "components/social/SocialHeader";
import MyFriends from "components/social/MyFriends";
import Loading from "components/Loading";
import Requests from "components/social/Requests";

import { QUERY_KEYS, ROUTES_NAME } from "constant";

import { UserInfoType } from "types/UserInfoType";

function SocialPage() {
  const [isDisplayMyFriends, setIsDisplayMyFriends] = useState(true);

  const userInfo = useQueryClient().getQueryData<UserInfoType>([
    QUERY_KEYS.USER,
  ]);

  const { data: friendListData, isLoading: friendListIsLoading } = useQuery(
    [QUERY_KEYS.FRIEND_LIST],
    getFriendList,
    { retry: 1 }
  );
  const { data: friendMessageListData, isLoading: friendMessageListIsLoading } =
    useQuery([QUERY_KEYS.FRIEND_MESSAGE_LIST], getFriendSendMessage, {
      retry: 1,
    });

  if (friendListIsLoading || friendMessageListIsLoading) return <Loading />;
  if (!userInfo) return <Navigate to={ROUTES_NAME.LOGIN} />;
  // if (friendListIsError || friendMessageListIsError)
  //   return <Navigate to={ROUTES_NAME.ERROR} />;

  return (
    <Container>
      <SocialHeader
        isDisplayMyFriends={isDisplayMyFriends}
        setIsDisplayMyFriends={setIsDisplayMyFriends}
      />
      {isDisplayMyFriends && (
        <MyFriends
          isDisplayMyFriends={isDisplayMyFriends}
          myFriends={friendListData?.data}
        />
      )}
      {!isDisplayMyFriends && (
        <Requests
          isDisplayMyFriends={isDisplayMyFriends}
          requests={friendMessageListData?.data}
        />
      )}
    </Container>
  );
}

export default SocialPage;
