import CloseButton from "components/commons/CloseButton";
import styled from "styled-components";
import { darkTheme } from "styles";

const MeetingGameModalHeader = () => {
  return (
    <Header>
      <TitleWrapper>
        <TitleCloseWrapper>
          <Title>예측 제안</Title>
        </TitleCloseWrapper>
        <SubTitle>
          방장이 게임을 제안하고 예측 결과를 맞힌 참가자에게 포인트를 드립니다.
        </SubTitle>
      </TitleWrapper>
    </Header>
  );
};

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleCloseWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Title = styled.h3`
  font-size: 1.6rem;
  margin-top: 0.5rem;
`;
const SubTitle = styled.p`
  margin-top: 1rem;
  font-size: 0.95rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const Header = styled.div`
  padding: 1.5rem 1rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default MeetingGameModalHeader;
