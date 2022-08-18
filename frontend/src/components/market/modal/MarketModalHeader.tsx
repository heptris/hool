import CloseButton from "components/commons/CloseButton";
import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const MarketModalHeader = () => {
  return (
    <Header>
      <TitleWrapper>
        <Title>이모지 상점 등록</Title>
        <SubTitle>
          직접 제작한 이모지를 판매해 포인트를 얻을 수 있어요!
        </SubTitle>
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

export default MarketModalHeader;
