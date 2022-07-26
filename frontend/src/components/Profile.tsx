import { useState } from "react";

import styled from "styled-components";
import { darkTheme } from "../styles/Theme";

import profileDefaultImg from "../assets/profile-default-img.png";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
  border: 1px solid ${darkTheme.adaptiveGrey700};
  border-radius: 4px;
  width: 20rem;
  background-color: ${darkTheme.mainColor};
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileHeader = styled.span`
  align-self: start;
  font-size: 1.25rem;
  font-weight: bold;
`;

const ProfileImg = styled.img`
  width: 5rem;
  border-radius: 3rem;
  margin-top: 3rem;
`;

const Username = styled.span`
  margin-top: 2rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Email = styled.span`
  color: ${darkTheme.adaptiveGrey200};
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
`;

const InfoBox = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
  margin: 6rem 0 3rem 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const InfoContent = styled.span`
  color: ${darkTheme.adaptiveGrey200};
  font-size: 0.875rem;
  margin: 1rem 0 0 0;
`;

const InfoNumber = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

function Profile() {
  const [username, setUsername] = useState<string | null>("Andrew");
  const [email, setEmail] = useState<string | null>("Andy@gmail.com");

  const [point, emojiCnt, followingCnt]: number[] = [1237, 2, 47];
  const [userPoint, setUserPoint] = useState<string | null>(
    point?.toLocaleString("ko-KR")
  );
  const [userEmojiCnt, setUserEmojiCnt] = useState<string | null>(
    emojiCnt?.toLocaleString("ko-KR")
  );
  const [userFollwingCnt, setUserFollowingCnt] = useState<string | null>(
    followingCnt?.toLocaleString("ko-KR")
  );

  return (
    <Container>
      <ProfileBox>
        <ProfileHeader>나의 프로필</ProfileHeader>

        <ProfileImg src={profileDefaultImg} alt="profile-img" />

        <Username>{username}</Username>
        <Email>{email}</Email>

        <InfoBox>
          <Info>
            <InfoNumber>{userPoint}</InfoNumber>
            <InfoContent>포인트</InfoContent>
          </Info>

          <Info>
            <InfoNumber>{userEmojiCnt}</InfoNumber>
            <InfoContent>이모지</InfoContent>
          </Info>

          <Info>
            <InfoNumber>{userFollwingCnt}</InfoNumber>
            <InfoContent>팔로잉</InfoContent>
          </Info>
        </InfoBox>
      </ProfileBox>
    </Container>
  );
}

export default Profile;
