import Container from "components/commons/Container";
import { MeetingHeader, MeetingList } from "components/meeting";
import { useEffect, useState } from "react";

const MeetingPage = () => {
  const [isState, setIsState] = useState(true);
  const [isSport, setIsSport] = useState("");
  const changeState = (value: boolean) => {
    setIsState(value);
  };

  const changeSport = (value: string) => {
    setIsSport(value);
  };
  console.log(isSport);

  return (
    <Container>
      <MeetingHeader
        changeSport={changeSport}
        changeState={changeState}
        isState={isState}
      />
      <MeetingList isState={isState} isSport={isSport} />
    </Container>
  );
};

export default MeetingPage;
