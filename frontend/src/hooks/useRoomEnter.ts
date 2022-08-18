import { useNavigate } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { setMySessionTitle, setMySessionId, setMyUserName } from "store";

import { QUERY_KEYS } from "constant";

const useRoomEnter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleEnterRoom = (
    title: string,
    conferenceId: number,
    nickName: string,
    data: { status: number }
  ) => {
    dispatch(setMySessionTitle(title));
    dispatch(setMySessionId("" + conferenceId));
    dispatch(setMyUserName(nickName));
    queryClient.setQueryData([QUERY_KEYS.ROOM_ACCESS], data.status);
    navigate({
      to: `/meeting/${conferenceId}`,
    });
  };

  return { handleEnterRoom };
};

export default useRoomEnter;
