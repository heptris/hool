import { useState } from "react";

import styled from "styled-components";

import SocialHeader from "components/social/SocialHeader";
import MyFriends from "components/social/MyFriends";
import Requests from "components/social/Requests";

function SocialView() {
  const [isDisplayMyFriends, setIsDisplayMyFriends] = useState(true);

  const myFriends = [
    {
      profileImg: 0,
      nickname: "Thomas",
      email: "tho@gmail.com",
      curPos: "일본 vs 대한민국 같이봐요",
      status: "live",
    },
    {
      profileImg: 1,
      nickname: "Bell",
      email: "bell@gmail.com",
      curPos: "접속중",
      status: "loggedIn",
    },
    {
      profileImg: 2,
      nickname: "Dijkstra",
      email: "graph@gmail.com",
      curPos: "12 minutes ago",
      status: "loggedOut",
    },
    {
      profileImg: 3,
      nickname: "Perry",
      email: "graph@gmail.com",
      curPos: "12 minutes ago",
      status: "loggedOut",
    },
  ];

  const requests = [{ nickname: "Ronaldo", msg: "친해지고싶어요." }];

  const searchRes = [{ nickname: "Kruskal", email: "mst@gmail.com" }];

  return (
    <Row>
      <SocialHeader
        isDisplayMyFriends={isDisplayMyFriends}
        setIsDisplayMyFriends={setIsDisplayMyFriends}
      />
      {isDisplayMyFriends && <MyFriends myFriends={myFriends} />}
      {!isDisplayMyFriends && <Requests />}
    </Row>
  );
}

const Row = styled.div`
  width: 83.333333%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 1rem 0 0 0;
`;

export default SocialView;
