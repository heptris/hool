import CloseButton from "components/commons/CloseButton";
import styled from "styled-components";
import { darkTheme } from "styles";

const MeetingModalHeader = () => {
  return (
    <Header>
      <TitleWrapper>
        <Title>응원방 생성</Title>
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
  font-size: 1.6rem;
  margin-top: 1rem;
`;
const SubTitle = styled.p`
  margin-top: 1rem;
  font-size: 0.95rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const Header = styled.div`
  padding: 1rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default MeetingModalHeader;
