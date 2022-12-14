import CloseButton from "components/commons/CloseButton";
import styled from "styled-components";
import { darkTheme } from "styles";

const PreferencesModalHeader = () => {
  return (
    <Header>
      <TitleWrapper>
        <TitleCloseWrapper>
          <Title>환경 설정</Title>
        </TitleCloseWrapper>
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
const Title = styled.h3``;
const Header = styled.div`
  padding: 1.5rem 1rem 1rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default PreferencesModalHeader;
