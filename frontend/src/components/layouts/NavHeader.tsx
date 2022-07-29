import { NavLink } from "react-router-dom";

import profileDefaultImg from "assets/profile-default-img.png";
import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const { adaptiveGrey200, mainColor } = darkTheme;

const NavHeader = () => {
  return (
    <Header>
      <NavLink to="/profile" style={{ textDecoration: "none" }}>
        <NavUser>
          <ProfileImg
            src={profileDefaultImg}
            alt={`${profileDefaultImg}의 프로필 이미지`}
          />
          <ProfileName>Andrew</ProfileName>
          <Icon className="fa-solid fa-chevron-down" />
        </NavUser>
      </NavLink>
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

  &:hover {
    cursor: pointer;

    i {
      transform: rotate(180deg);
      transition: transform ease 0.3s;
    }
  }
`;

export default NavHeader;
