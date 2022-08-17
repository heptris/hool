import styled from "styled-components";

import { FriendInfoType } from "types/FriendInfoType";

import SocialItem from "./SocialItem";

type PropsType = {
  myFriends: FriendInfoType[];
  isDisplayMyFriends: boolean;
};

function MyFriends({ myFriends, isDisplayMyFriends }: PropsType) {
  return (
    <MyFriendsBox>
      {myFriends.map((user) => (
        <SocialItem
          key={user.friendMemberId}
          isDisplayMyFriends={isDisplayMyFriends}
          {...user}
        />
      ))}
    </MyFriendsBox>
  );
}

const MyFriendsBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  row-gap: 2rem;
  column-gap: 1.5vw;
  margin-top: 2rem;
  justify-content: center;
`;

export default MyFriends;
