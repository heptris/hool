import styled from "styled-components";
import { darkTheme } from "styles/Theme";

function EnrollModalHeader() {
  return (
    <Header>
      <TitleWrapper>
        <Title>이모지 등록</Title>
        <SubTitle>
          누구든지 직접 제작한 이모지를 자유롭게 등록해보세요!
        </SubTitle>
      </TitleWrapper>
    </Header>
  );
}

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

export default EnrollModalHeader;
