import profileDefaultImg from "assets/profile-default-img.png";
import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const { adaptiveGrey200, mainColor } = darkTheme;

const NavHeader = () => {
  return (
    <Header>
      <NavUser>
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
  justify-content: end;
  align-items: center;
  background-color: ${mainColor};
`;
const Icon = styled.i`
  color: ${adaptiveGrey200};
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
  margin-right: 1rem;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export default NavHeader;
