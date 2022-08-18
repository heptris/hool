import Container from "components/commons/Container";
import { MeetingHeader, MeetingList } from "components/meeting";
import { useEffect, useState } from "react";

const MeetingPage = () => {
  const [isState, setIsState] = useState("DEFAULT");
  const changeState = (value: string) => {
    setIsState(value);
  };

  return (
    <Container>
      <MeetingHeader changeState={changeState} />
      <MeetingList isState={isState} />
    </Container>
  );
};

export default MeetingPage;
