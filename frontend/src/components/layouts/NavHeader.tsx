import { useState } from "react";
import { Link } from "@tanstack/react-location";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import useAuth from "hooks/useAuth";

import profileDefaultImg from "assets/profile-default-imgs/1.png";

import { QUERY_KEYS, ROUTES_NAME } from "constant";
import { useQueryClient } from "@tanstack/react-query";
import { UserInfoType } from "types/UserInfoType";

const { adaptiveGrey200, mainColor } = darkTheme;
const { LOGIN, PROFILE } = ROUTES_NAME;

const NavHeader = () => {
  const userInfo = useQueryClient().getQueryData<UserInfoType>([
    QUERY_KEYS.USER,
  ]);

  const profileUrl = userInfo?.memberProfile;

  const [isDisplayMenu, setIsDisplayMenu] = useState(false);
  const { logout } = useAuth();

  return (
    <Header>
      {userInfo ? (
        <>
          <NavUser
            onMouseEnter={() => setIsDisplayMenu(true)}
            onMouseLeave={() => setIsDisplayMenu(false)}
          >
            {isDisplayMenu && (
              <ProfileMenu
                onMouseEnter={() => setIsDisplayMenu(true)}
                onMouseLeave={() => setIsDisplayMenu(false)}
              >
                <Link to={PROFILE}>
                  <MenuItem>
                    <span>프로필</span>
                  </MenuItem>
                </Link>
                <Hr />
                <MenuItem onClick={logout}>
                  <span>로그아웃</span>
                </MenuItem>
              </ProfileMenu>
            )}
            <ProfileImg
              src={profileUrl}
              alt={`${profileDefaultImg}의 프로필 이미지`}
            />
            <ProfileName>{userInfo.nickName}</ProfileName>
            <Icon className="fa-solid fa-chevron-down" />
          </NavUser>
          <Icon className="fa-solid fa-bell" />
        </>
      ) : (
        <Link to={LOGIN}>
          <LoginBtn>로그인</LoginBtn>
        </Link>
      )}
    </Header>
  );
};

const Header = styled.nav`
  margin: 0 auto;
  left: 0;
  right: 0;
  padding: 0.7rem 5%;
  height: 2rem;
  display: flex;
  position: fixed;
  z-index: 1;
  justify-content: end;
  align-items: center;
  background-color: ${mainColor};
`;
const Icon = styled.i`
  color: ${adaptiveGrey200};

  &:hover {
    cursor: pointer;
  }
`;
const ProfileImg = styled.img`
  height: 2rem;
  border-radius: 4px;
`;
const ProfileName = styled.p`
  width: 5rem;
  color: ${adaptiveGrey200};
  font-size: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const NavUser = styled.div`
  margin-right: 2rem;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;

  & i {
    transition: transform ease 0.3s;
  }
  &:hover {
    cursor: pointer;
    i {
      transform: rotate(180deg);
    }
  }
`;
const ProfileMenu = styled.div`
  position: fixed;
  top: 2.8rem;
  width: 10rem;
  background-color: ${darkTheme.mainColor};
  border-radius: 4px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const MenuItem = styled.div`
  padding: 0.6rem 0.5rem;
  text-align: center;

  span {
    color: ${darkTheme.adaptiveGrey200};
  }
`;
const Hr = styled.hr`
  border: 1px solid ${darkTheme.adaptiveGrey800};
  background-color: ${darkTheme.adaptiveGrey800};
  margin: 0;
`;
const LoginBtn = styled.button`
  width: 5.3rem;
  height: 2.3rem;
  font-size: 1rem;
  border-radius: 2rem;
  background-color: ${darkTheme.darkColor};

  &:hover {
    cursor: pointer;
    background-color: ${darkTheme.emphasisColor};
  }
`;

export default NavHeader;
