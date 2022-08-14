import { Navigate, useMatch } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";

import MeetingRoom from "components/meeting/MeetingRoom";

import { QUERY_KEYS, ROUTES_NAME } from "constant";
import useUser from "hooks/useUser";

const RoomPage = () => {
  const match = useMatch();
  const {
    params: { id },
  } = match;
  const { userInfo } = useUser();
  const queryClient = useQueryClient();

  const conferenceId = +id;
  if (queryClient.getQueryData([QUERY_KEYS.ROOM_ACCESS]) !== 200)
    return <Navigate to={ROUTES_NAME.MAIN} replace={true} />;
  if (!userInfo) return <Navigate to={ROUTES_NAME.LOGIN} />;
  if (isNaN(conferenceId)) return <Navigate to={ROUTES_NAME.ERROR} />;

  return <MeetingRoom conferenceId={conferenceId} />;
};

export default RoomPage;
