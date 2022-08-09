import { useState } from "react";
import { Link } from "@tanstack/react-location";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import profileDefaultImg from "assets/profile-default-imgs/1.png";
import { ROUTES_NAME } from "constant";

const { adaptiveGrey200, mainColor } = darkTheme;
const { LOGIN, PROFILE } = ROUTES_NAME;

const NavHeader = () => {
  const [isDisplayMenu, setIsDisplayMenu] = useState(false);

  return (
    <Header>
      <Link to={LOGIN}>
        <LoginBtn>로그인</LoginBtn>
      </Link>
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
            <MenuItem>
              <span>로그아웃</span>
            </MenuItem>
          </ProfileMenu>
        )}
        <ProfileImg
          src={profileDefaultImg}
          alt={`${profileDefaultImg}의 프로필 이미지`}
        />
        <ProfileName>Andrew</ProfileName>
        <Icon className="fa-solid fa-chevron-down" />
      </NavUser>
      <Icon className="fa-solid fa-bell" />
    </Header>
  );
};

const Header = styled.nav`
  margin: 0 auto;
  left: 0;
  right: 0;
  padding: 0.7rem 4rem;
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
  color: ${adaptiveGrey200};
  font-size: 1rem;
`;
const NavUser = styled.div`
  margin-right: 2rem;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

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
  width: 4rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: ${darkTheme.darkColor};

  &:hover {
    cursor: pointer;
    background-color: ${darkTheme.emphasisColor};
  }
`;

export default NavHeader;
