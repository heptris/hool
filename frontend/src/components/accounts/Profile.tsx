import { useState } from "react";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import profileDefaultImg from "assets/profile-default-imgs/1.png";

import Button from "../commons/Button";
import Modal from "../commons/Modal";
import Card from "../commons/Card";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isDisplayModal, setIsDisplayModal] = useState(false);

  const switchIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const switchIsDisplayModal = () => {
    setIsDisplayModal(!isDisplayModal);
  };

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
    <>
      {isDisplayModal && (
        <Modal
          header={
            <PointLogHeader>
              <span>큐브 획득 내역</span>
            </PointLogHeader>
          }
          body={
            <PointLogBody>
              <Card marginTop={1}>
                <CardContent>
                  <div>
                    <Activity>로그인 보너스</Activity>
                    <Date>2022.07.25</Date>
                  </div>
                  <Diff>+500</Diff>
                </CardContent>
              </Card>
            </PointLogBody>
          }
          onDisplayChange={switchIsDisplayModal}
        />
      )}

      <ProfileBox>
        <ProfileHeader>나의 프로필</ProfileHeader>

        <ProfileImg src={profileDefaultImg} alt="profile-img" />

        <Username>{username}</Username>
        <Email>{email}</Email>

        <div onClick={switchIsEditing}>
          <Button width={6} height={2} text={"프로필 편집"} />
        </div>

        <InfoBox>
          <Clickable onClick={switchIsDisplayModal}>
            <Info>
              <InfoNumber>{userPoint}</InfoNumber>
              <InfoContent>큐브</InfoContent>
            </Info>
          </Clickable>

          <Info>
            <InfoNumber>{userEmojiCnt}</InfoNumber>
            <InfoContent>이모지</InfoContent>
          </Info>

          <Info>
            <InfoNumber>{userFollwingCnt}</InfoNumber>
            <InfoContent>친구</InfoContent>
          </Info>
        </InfoBox>
      </ProfileBox>
    </>
  );
}

const ProfileBox = styled.div`
  border: 1px solid ${darkTheme.adaptiveGrey700};
  border-radius: 4px;
  width: 30rem;
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
  margin: 0.5rem 0 2.5rem 0;
`;

const InfoBox = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin: 5rem 0 3rem 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1rem;
  width: 3rem;
`;

const Clickable = styled.div`
  &:hover {
    cursor: pointer;
    background-color: ${darkTheme.darkColor};
    border-radius: 8px;
  }
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

const PointLogHeader = styled.h1`
  width: 30rem;
  margin: 1rem 0 1rem 0;
`;

const PointLogBody = styled.div`
  width: 100%;
  height: 30rem;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: ${darkTheme.adaptiveGrey500};
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 1.5rem;
`;

const Activity = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
`;

const Date = styled.span`
  font-size: 0.875rem;
  color: ${darkTheme.adaptiveGrey500};
`;

const Diff = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

export default Profile;
