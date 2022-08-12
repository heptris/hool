import { Navigate, useNavigate } from "@tanstack/react-location";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import useUser from "hooks/useUser";

import styled from "styled-components";

import {
  getMeetingList,
  postCheckPasswordBeforeEnterMeetingRoom,
  postEnterMeetingRoom,
} from "api/meeting";

import MeetingListItem from "./MeetingListItem";
import Loading from "components/Loading";

import { QUERY_KEYS } from "constant";

import { handleEnterRoom } from "utils/handleEnterRoom";

import { MeetingRoomType } from "types/MeetingRoomType";

const MeetingList = () => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery([QUERY_KEYS.MEETINGS], () =>
    getMeetingList()
  );
  const { mutate } = useMutation(postCheckPasswordBeforeEnterMeetingRoom, {
    onSuccess: (data, { conferenceId }) => {
      handleEnterRoom(conferenceId, userInfo.nickName, navigate, dispatch);
    },
    onError: (err) => {
      err.response.data.message ? alert(err.response.data.message) : alert(err);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <Navigate to={"/error"} />;

  return (
    <ItemList>
      {data.data.map((el: MeetingRoomType) => {
        const { conferenceId, isPublic } = el;
        return userInfo ? (
          <ItemLink
            key={conferenceId}
            onClick={() => {
              isPublic
                ? (() => {
                    postEnterMeetingRoom({
                      conferenceId: conferenceId,
                    });
                    handleEnterRoom(
                      conferenceId,
                      userInfo.nickName,
                      navigate,
                      dispatch
                    );
                  })()
                : (() => {
                    const password =
                      prompt("비공개 방 비밀번호를 입력해주세요");
                    mutate({
                      conferenceId,
                      password: password ? password : "",
                    });
                  })();
            }}
          >
            <MeetingListItem {...el} />
          </ItemLink>
        ) : (
          <div onClick={() => alert("로그인이 필요한 서비스입니다.")}>
            <MeetingListItem {...el} />
          </div>
        );
      })}
    </ItemList>
  );
};

const ItemList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  row-gap: 2rem;
  column-gap: 1.5vw;
  margin-top: 2rem;
  justify-content: center;
`;
const ItemLink = styled.li`
  cursor: pointer;
`;
export default MeetingList;
