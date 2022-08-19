import { Navigate, useMatch } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import { postExitMeetingRoom } from "api/meeting";

import MeetingRoom from "components/meeting/MeetingRoom";

import { QUERY_KEYS, ROUTES_NAME } from "constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsHost, setNavMode } from "store";
import { UserInfoType } from "types/UserInfoType";

const RoomPage = () => {
  const match = useMatch();
  const dispatch = useDispatch();
  const {
    params: { id },
  } = match;

  useEffect(() => {
    dispatch(setNavMode("meetingRoom"));
    return () => {
      postExitMeetingRoom({ conferenceId });
      dispatch(setNavMode("default"));
      dispatch(setIsHost(false));
      queryClient.setQueryData([QUERY_KEYS.ROOM_ACCESS], 404);
      queryClient.invalidateQueries([QUERY_KEYS.USER]);
      console.log("방 나가짐");
    };
  }, []);

  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<UserInfoType>([QUERY_KEYS.USER]);

  const conferenceId = +id;
  if (queryClient.getQueryData([QUERY_KEYS.ROOM_ACCESS]) !== 200)
    return <Navigate to={ROUTES_NAME.MAIN} replace={true} />;
  if (!userInfo) return <Navigate to={ROUTES_NAME.LOGIN} />;
  if (isNaN(conferenceId)) return <Navigate to={ROUTES_NAME.ERROR} />;

  return <MeetingRoom />;
};

export default RoomPage;
