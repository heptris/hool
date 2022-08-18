import styled from "styled-components";
import { darkTheme } from "styles/Theme";

function EnrollModalHeader() {
  return (
    <Header>
      <TitleWrapper>
        <Title>이모지 등록</Title>
        <SubTitle>직접 제작한 이모지를 자유롭게 등록해보세요!</SubTitle>
      </TitleWrapper>
    </Header>
  );
}

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

export default EnrollModalHeader;
