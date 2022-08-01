import { useState } from "react";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import pdi1 from "assets/profile-default-imgs/1.png";
import pdi2 from "assets/profile-default-imgs/2.png";
import pdi3 from "assets/profile-default-imgs/3.jpg";
import pdi4 from "assets/profile-default-imgs/4.png";
import pdi5 from "assets/profile-default-imgs/5.jpg";
import pdi6 from "assets/profile-default-imgs/6.jpg";

import Card from "components/commons/Card";

type PropsType = {
  profileImg: number;
  nickname: string;
  email: string;
  curPos: string;
  status: string;
};

function SocialItem({
  profileImg,
  nickname,
  email,
  curPos,
  status,
}: PropsType) {
  const profiles = [pdi1, pdi2, pdi3, pdi4, pdi5, pdi6];
  const [isDisplayOption, setIsDisplayOption] = useState(false);

  return (
    <SocialCard>
      <ProfileImg src={profiles[profileImg]} />
      <UserInfo>
        <Nickname>{nickname}</Nickname>
        <Email>{email}</Email>
        <CurrentPos>{curPos}</CurrentPos>
      </UserInfo>
      <MenuIcon
        onClick={() => {
          setIsDisplayOption(!isDisplayOption);
        }}
        className="fa-solid fa-ellipsis-vertical"
      />
    </SocialCard>
  );
}

const SocialCard = styled(Card)`
  display: flex;
  background-color: ${darkTheme.mainColor};
  margin: 2vw 0 0 0;
  width: 32%;
`;

const ProfileImg = styled.img`
  width: 17%;
  border-radius: 5rem;
  margin: 1.5vw 0 1.5vw 1.5vw;
`;

const UserInfo = styled.div`
  align-self: center;
  margin: 0 5vw 0 2vw;
  width: 50%;
`;

const Nickname = styled.h1`
  font-size: 1vw;
  margin-bottom: 0.5vw;
`;

const Email = styled.h2`
  font-size: 0.8vw;
  font-weight: normal;
  color: ${darkTheme.adaptiveGrey700};
  margin-bottom: 0.3vw;
`;

const CurrentPos = styled.span`
  font-size: 0.8vw;
  color: ${darkTheme.adaptiveGrey500};
`;

const MenuIcon = styled.i`
  width: 2vw;
  margin: 1vw 1vw 0 0;
  text-align: center;

  &:hover {
    cursor: pointer;
    color: ${darkTheme.adaptiveGrey200};
  }
`;

export default SocialItem;
