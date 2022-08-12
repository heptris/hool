import { Navigate, useMatch } from "@tanstack/react-location";

import MeetingRoom from "components/meeting/MeetingRoom";

import { ROUTES_NAME } from "constant";

const RoomPage = () => {
  const match = useMatch();
  const {
    params: { id },
  } = match;

  const conferenceId = +id;
  if (isNaN(conferenceId)) return <Navigate to={ROUTES_NAME.ERROR} />;

  return <MeetingRoom conferenceId={conferenceId} />;
};

export default RoomPage;
