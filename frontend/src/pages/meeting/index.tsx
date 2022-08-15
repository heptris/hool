import Container from "components/commons/Container";
import { MeetingHeader, MeetingList } from "components/meeting";
import { useEffect, useState } from "react";

const MeetingPage = () => {
  const [isState, setIsState] = useState(true);
  const changeState = (value: boolean) => {
    setIsState(value);
  };

  return (
    <Container>
      <MeetingHeader changeState={changeState} isState={isState} />
      <MeetingList isState={isState} />
    </Container>
  );
};

export default MeetingPage;
