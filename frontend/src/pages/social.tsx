import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-location";

import { getFriendList, getFriendSendMessage } from "api/social";

import Container from "components/commons/Container";
import SocialHeader from "components/social/SocialHeader";
import MyFriends from "components/social/MyFriends";
import Loading from "components/Loading";
import Requests from "components/social/Requests";

import { QUERY_KEYS, ROUTES_NAME } from "constant";

import { getMyProfile } from "api/profile";

function SocialPage() {
  const [isDisplayMyFriends, setIsDisplayMyFriends] = useState(true);
  const { data: userInfo, isLoading: isUserInfoLoading } = useQuery(
    [QUERY_KEYS.USER],
    getMyProfile
  );
  const { data: friendListData, isLoading: friendListIsLoading } = useQuery(
    [QUERY_KEYS.FRIEND_LIST],
    getFriendList,
    { retry: 1 }
  );
  const { data: friendMessageListData, isLoading: friendMessageListIsLoading } =
    useQuery([QUERY_KEYS.FRIEND_MESSAGE_LIST], getFriendSendMessage, {
      retry: 1,
    });

  if (friendListIsLoading || friendMessageListIsLoading || isUserInfoLoading)
    return <Loading />;
  if (!userInfo) return <Navigate to={ROUTES_NAME.LOGIN} />;

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
