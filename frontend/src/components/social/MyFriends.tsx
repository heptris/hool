import styled from "styled-components";

import SocialItem from "./SocialItem";

type UserType = {
  profileImg: number;
  nickname: string;
  email: string;
  curPos: string;
  status: string;
};

type PropsType = {
  myFriends: UserType[];
};

function MyFriends({ myFriends }: PropsType) {
  return (
    <MyFriendsBox>
      {myFriends.map((user: UserType) => {
        return <SocialItem {...user} />;
      })}
    </MyFriendsBox>
  );
}

const MyFriendsBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
`;

export default MyFriends;
