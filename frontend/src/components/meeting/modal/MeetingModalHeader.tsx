import CloseButton from "components/commons/CloseButton";
import styled from "styled-components";
import { darkTheme } from "styles";

const MeetingModalHeader = () => {
  return (
    <Header>
      <TitleWrapper>
        <Title>응원 세션 생성</Title>
        <SubTitle>친구와 함께 응원할 방을 직접 만들어보세요!</SubTitle>
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
  margin-top: 0.5rem;
  font-size: 0.825rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const Header = styled.div`
  padding: 1.5rem 1rem 1rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default MeetingModalHeader;
