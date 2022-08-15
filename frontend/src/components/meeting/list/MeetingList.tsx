import React, { useEffect, useState } from "react";
import { Navigate } from "@tanstack/react-location";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import useRoomEnter from "hooks/useRoomEnter";

import styled from "styled-components";

import {
  getMeetingListPage,
  postCheckPasswordBeforeEnterMeetingRoom,
  postEnterMeetingRoom,
} from "api/meeting";

import MeetingListItem from "./MeetingListItem";
import Loading from "components/Loading";

import { QUERY_KEYS } from "constant";

import { MeetingRoomType } from "types/MeetingRoomType";
import { UserInfoType } from "types/UserInfoType";

const MeetingList = ({ isState }: { isState: boolean }) => {
  const { ref, inView } = useInView();
  const [size, setSize] = useState(4);
  const userInfo = useQueryClient().getQueryData<UserInfoType>([
    QUERY_KEYS.USER,
  ]);
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [QUERY_KEYS.MEETING_LIST_PAGE],
    ({ pageParam }) =>
      getMeetingListPage({ pageParam, size }).then((res) => res.data),
    {
      getNextPageParam: (lastPageRes) => lastPageRes.cursorId,
    }
  );
  const { handleEnterRoom } = useRoomEnter();
  const { mutate: mutatePublic } = useMutation(postEnterMeetingRoom, {
    onSuccess: (data, { conferenceId }) => {
      userInfo && handleEnterRoom(conferenceId, userInfo.nickName, data);
    },
    onError: (error) => {
      // err.response.data.message ? alert(err.response.data.message) :
      alert(error);
    },
  });
  const { mutate: mutatePrivate } = useMutation(
    postCheckPasswordBeforeEnterMeetingRoom,
    {
      onSuccess: (data, { conferenceId }) => {
        userInfo && handleEnterRoom(conferenceId, userInfo.nickName, data);
      },
      onError: (error) => {
        // err.response.data.message ? alert(err.response.data.message) :
        alert(error);
      },
    }
  );

  useEffect(() => {
    if (inView) {
      hasNextPage && !isFetchingNextPage && fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <Loading />;
  if (isError) return <Navigate to={"/error"} />;

  return (
    <InventoryContent>
      {/* <div onScroll={onScroll} ref={viewRef} /> */}
      {isState ? (
        <ItemList>
          {data.pages.map((page) => (
            <React.Fragment key={page.nextId}>
              {page.values.map((el: MeetingRoomType) => {
                const { conferenceId, isPublic } = el;
                return userInfo ? (
                  <ItemLink
                    key={conferenceId}
                    onClick={() => {
                      isPublic
                        ? (() => {
                            mutatePublic({
                              conferenceId: conferenceId,
                            });
                          })()
                        : (() => {
                            const password =
                              prompt("비공개 방 비밀번호를 입력해주세요");
                            mutatePrivate({
                              conferenceId,
                              password: password ? password : "",
                            });
                          })();
                    }}
                  >
                    <MeetingListItem {...el} />
                  </ItemLink>
                ) : (
                  <div
                    onClick={() => {
                      alert("로그인이 필요한 서비스입니다.");
                    }}
                  >
                    <MeetingListItem {...el} />
                  </div>
                );
              })}
            </React.Fragment>
          ))}
          <div ref={ref} />
        </ItemList>
      ) : (
        <ItemList></ItemList>
      )}
    </InventoryContent>
  );
};
const InventoryContent = styled.div``;

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
