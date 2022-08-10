import CloseButton from "components/commons/CloseButton";
import styled from "styled-components";
import { darkTheme } from "styles";

const PreferencesModalHeader = ({
  onDisplayChange,
}: {
  onDisplayChange: Function;
}) => {
  return (
    <Header>
      <TitleWrapper>
        <TitleCloseWrapper>
          <Title>환경 설정</Title>
          <CloseButton onDisplayChange={onDisplayChange} />
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
const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;
const Header = styled.div`
  padding: 1.5rem 1rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default PreferencesModalHeader;
