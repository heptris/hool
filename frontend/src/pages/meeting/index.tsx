import { useQuery } from "@tanstack/react-query";
import { getMeetingList } from "api/meeting";
import Container from "components/commons/Container";
import { MeetingHeader, MeetingList } from "components/meeting";

const MeetingPage = () => {
  const meetingList = useQuery(["meetings"], () => getMeetingList());
  console.log(meetingList);

  return (
    <Container>
      <MeetingHeader />
      <MeetingList />
    </Container>
  );
};

export default MeetingPage;
