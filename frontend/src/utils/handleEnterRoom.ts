import { setMySessionId, setMyUserName } from "store";

const handleEnterRoom = (
  conferenceId: number,
  nickName: string,
  navigate: Function,
  dispatch: Function
) => {
  dispatch(setMySessionId("" + conferenceId));
  dispatch(setMyUserName(nickName));

  navigate({
    to: `/meeting/${conferenceId}`,
    replace: true,
  });
};

export { handleEnterRoom };
