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
  const queryClient = useQueryClient();
  const userInfo: UserInfoType | undefined = queryClient.getQueryData([
    QUERY_KEYS.USER,
  ]);
  const [isDisplayMyFriends, setIsDisplayMyFriends] = useState(true);
  const {
    data: friendListData,
    isError: friendListIsError,
    isLoading: friendListIsLoading,
  } = useQuery([QUERY_KEYS.FRIEND_LIST], getFriendList);
  const {
    data: friendMessageListData,
    isError: friendMessageListIsError,
    isLoading: friendMessageListIsLoading,
  } = useQuery([QUERY_KEYS.FRIEND_MESSAGE_LIST], getFriendSendMessage);

  console.log(userInfo, friendListIsError, friendMessageListIsError);

  if (!userInfo) return <Navigate to={ROUTES_NAME.LOGIN} />;
  if (friendListIsLoading && friendMessageListIsLoading) return <Loading />;
  // if (friendListIsError && friendMessageListIsError)
  //   return <Navigate to={ROUTES_NAME.ERROR} />;
  const myFriends = friendListData.data;
  const requests = friendMessageListData.data;

  // const searchRes = [
  //   {
  //     profileImg: 0,
  //     nickname: "Thomas",
  //     email: "tho@gmail.com",
  //     curPos: "일본 vs 대한민국 같이봐요",
  //     status: "live",
  //   },
  // ];

  return (
    <Container>
      <SocialHeader
        isDisplayMyFriends={isDisplayMyFriends}
        setIsDisplayMyFriends={setIsDisplayMyFriends}
      />
      {isDisplayMyFriends && (
        <MyFriends
          isDisplayMyFriends={isDisplayMyFriends}
          myFriends={myFriends}
        />
      )}
      {!isDisplayMyFriends && (
        <Requests isDisplayMyFriends={isDisplayMyFriends} requests={requests} />
      )}
    </Container>
  );
}

export default SocialPage;
