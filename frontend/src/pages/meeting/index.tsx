import Container from "components/commons/Container";
import { MeetingHeader, MeetingList } from "components/meeting";

const MeetingPage = () => {
  return (
    <Container>
      <MeetingHeader />
      <MeetingList />
    </Container>
  );
};

export default MeetingPage;
