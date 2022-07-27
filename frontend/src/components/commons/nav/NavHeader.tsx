import profileDefaultImg from "assets/profile-default-img.png";
import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const { adaptiveGrey200, adaptiveGrey800 } = darkTheme;

const NavHeader = () => {
  return (
    <Header>
      <Icon className="fa-solid fa-bell" />
      <NavUser>
        <ProfileImg
          src={profileDefaultImg}
          alt={`${profileDefaultImg}의 프로필 이미지`}
        />
        <p>Andrew</p>
        <select className="select"></select>
      </NavUser>
    </Header>
  );
};

const Header = styled.nav`
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  padding: 1rem;
  width: 94vw;
  height: 2.5rem;
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: ${adaptiveGrey800};
`;
const Icon = styled.i`
  margin-right: 1rem;
  color: ${adaptiveGrey200};
`;
const ProfileImg = styled.img`
  height: 2rem;
  border-radius: 4px;
`;
const NavUser = styled.div`
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: ${adaptiveGrey200};
`;

export default NavHeader;
