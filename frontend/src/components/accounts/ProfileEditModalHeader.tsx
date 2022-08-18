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
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  font-size: 1.25rem;
`;
const SubTitle = styled.p`
  font-size: 0.825rem;
  margin-top: 0.5rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const Header = styled.div`
  padding: 1.5rem 1rem 1rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default ProfileEditModalHeader;
