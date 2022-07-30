import { useState } from "react";

import styled from "styled-components";

import SocialHeader from "components/social/SocialHeader";
import MyFriends from "components/social/MyFriends";
import Requests from "components/social/Requests";
import { Layout } from "components/layouts/Layout";

function SocialView() {
  const [isDisplayMyFriends, setIsDisplayMyFriends] = useState(true);

  const myFriends = [
    { nickname: "Thomas", curPos: "일본 vs 대한민국 같이봐요", status: "live" },
    { nickname: "Bell", curPos: "접속중", status: "loggedIn" },
    { nickname: "Dijkstra", curPos: "12 minutes ago", status: "loggedOut" },
  ];

  const requests = [{ nickname: "Ronaldo", msg: "친해지고싶어요." }];

  const searchRes = [{ nickname: "Kruskal", email: "mst@gmail.com" }];

  return (
    <Layout>
      <Container>
        <SocialHeader
          isDisplayMyFriends={isDisplayMyFriends}
          setIsDisplayMyFriends={setIsDisplayMyFriends}
        />
        {isDisplayMyFriends && <MyFriends />}
        {!isDisplayMyFriends && <Requests />}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 1rem 0 0 0;
`;

export default SocialView;
