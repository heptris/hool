import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const ProfileEditModalHeader = () => {
  return (
    <Header>
      <TitleWrapper>
        <Title>프로필 수정</Title>
        <SubTitle>나의 프로필 정보를 수정할 수 있습니다.</SubTitle>
      </TitleWrapper>
    </Header>
  );
};

const TitleWrapper = styled.div`
  width: 39vh;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  font-size: 1.3rem;
  margin-top: 0.5rem;
`;
const SubTitle = styled.p`
  font-size: 0.8rem;
  margin-top: 1rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const Header = styled.div`
  padding: 1rem 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default ProfileEditModalHeader;
