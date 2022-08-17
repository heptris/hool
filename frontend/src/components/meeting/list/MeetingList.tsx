import { Link, Navigate } from "@tanstack/react-location";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import useUser from "hooks/useUser";

import styled from "styled-components";

import { getMeetingList, postEnterMeetingRoom } from "api/meeting";

import { setMySessionId, setMyUserName } from "store";

import MeetingListItem from "./MeetingListItem";
import Loading from "components/Loading";

import { QUERY_KEYS } from "constant";

import { MeetingRoomType } from "types/MeetingRoomType";

const MeetingList = () => {
  const { data, isLoading, isError } = useQuery([QUERY_KEYS.MEETINGS], () =>
    getMeetingList()
  );
  const { userInfo } = useUser();

  const dispatch = useDispatch();

  if (isLoading) return <Loading />;
  if (isError) return <Navigate to={"/error"} />;

  return (
    <ItemList>
      {data.data.map((el: MeetingRoomType) => {
        return userInfo ? (
          <Link
            to={`meeting/${el.conferenceId}`}
            key={el.conferenceId}
            onClick={() => {
              dispatch(setMySessionId("" + el.conferenceId));
              dispatch(setMyUserName(userInfo.nickName));
              postEnterMeetingRoom({
                conferenceId: el.conferenceId,
                memberId: userInfo.memberId,
              });
            }}
          >
            <MeetingListItem {...el} />
          </Link>
        ) : (
          <div onClick={() => alert("로그인이 필요한 서비스입니다.")}>
            <MeetingListItem {...el} />
          </div>
        );
      })}
    </ItemList>
  );
};

const ItemList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  row-gap: 2rem;
  column-gap: 1.5vw;
  margin-top: 2rem;
  justify-content: center;
`;
export default MeetingList;
