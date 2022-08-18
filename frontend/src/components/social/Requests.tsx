import styled from "styled-components";

import SocialItem from "./SocialItem";

import { FriendRequestInfoType } from "types/FriendInfoType";

type PropsType = {
  requests: FriendRequestInfoType[];
  isDisplayMyFriends: boolean;
};

function Requests({ requests, isDisplayMyFriends }: PropsType) {
  return (
    <RequestsBox>
      {requests.map((user) => (
        <SocialItem
          key={user.friendRequestId}
          isDisplayMyFriends={isDisplayMyFriends}
          {...user}
        />
      ))}
    </RequestsBox>
  );
}

const RequestsBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  row-gap: 2rem;
  column-gap: 1.5vw;
  margin-top: 2rem;
  justify-content: center;
`;

export default Requests;
