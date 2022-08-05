import { useState } from "react";
import { Link } from "@tanstack/react-location";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import pdi1 from "assets/profile-default-imgs/1.png";
import pdi2 from "assets/profile-default-imgs/2.png";
import pdi3 from "assets/profile-default-imgs/3.jpg";
import pdi4 from "assets/profile-default-imgs/4.png";
import pdi5 from "assets/profile-default-imgs/5.jpg";
import pdi6 from "assets/profile-default-imgs/6.jpg";

import { UserType } from "./MyFriends";

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
  isDisplayMyFriends,
}: UserType & { isDisplayMyFriends: boolean }) {
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
      <div>
        <MenuIcon
          onClick={() => {
            setIsDisplayOption(!isDisplayOption);
          }}
          className="fa-solid fa-ellipsis-vertical"
        ></MenuIcon>
        {isDisplayOption && (
          <Menu>
            <Link
              to={curPos}
              onClick={() => {
                setIsDisplayOption(!isDisplayOption);
              }}
            >
              <div>친구와 함께하기</div>
            </Link>
          </Menu>
        )}
      </div>
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
  width: 70%;
`;

const Nickname = styled.h1`
  font-size: 1.1vw;
  margin-bottom: 0.5vw;
`;

const Email = styled.h2`
  font-size: 0.9vw;
  font-weight: normal;
  color: ${darkTheme.adaptiveGrey700};
  margin-bottom: 0.3vw;
`;

const CurrentPos = styled.span`
  font-size: 0.9vw;
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

const Menu = styled.div`
  width: 7vw;
  height: 2.5vw;
  background-color: ${darkTheme.adaptiveGrey800};
  transform: translate(-50%, -50%);
  position: absolute;
  margin-top: 2rem;
  border-radius: 4px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  justify-content: center;
  align-self: center;

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: normal;
      width: 100%;
      height: 60%;

      &:hover {
        background-color: ${darkTheme.adaptiveGrey500};
      }
    }
  }
`;

export default SocialItem;
