import profileDefaultImg from "assets/profile-default-img.png";
import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const NavHeader = () => {
  return (
    <Header>
      <div className="emoji">♟️</div>
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
  background-color: ${darkTheme.adaptiveGrey800};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  padding: 1rem;
  height: 2rem;
`;
const ProfileImg = styled.img`
  height: 2rem;
  border-radius: 4px;
`;
const NavSide = styled.nav`
  display: flex;
  flex-direction: column;
`;
const NavUser = styled.div`
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export default NavHeader;
