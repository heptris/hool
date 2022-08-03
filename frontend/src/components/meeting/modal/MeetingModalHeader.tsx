import CloseButton from "components/commons/CloseButton";
import styled from "styled-components";

const MeetingModalHeader = ({
  onDisplayChange,
}: {
  onDisplayChange: Function;
}) => {
  return (
    <Header>
      <Title>응원방 생성</Title>
      <CloseButton onDisplayChange={onDisplayChange} />
    </Header>
  );
};
const Title = styled.h3`
  font-size: 2rem;
`;
const Header = styled.div`
  padding: 2rem 1rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default MeetingModalHeader;
