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

import type { MeetingRoomType } from "types/MeetingRoomType";
import type { UserInfoType } from "types/UserInfoType";
import type { ConferenceCategoryType } from "types/ConferenceCategoryType";

type PropsType = {
  isState: string;
};

const MeetingList = ({ isState }: PropsType) => {
  const { ref, inView } = useInView();
  const [size, setSize] = useState(4);
  const newList: Array<any> = [];
  const userInfo = useQueryClient().getQueryData<UserInfoType>([
    QUERY_KEYS.USER,
  ]);
  const {
    data: allMeetingList,
    isLoading: allMeetingListIsLoading,
    isError: allMeetingListIsError,
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
  isState === "DEFAULT"
    ? allMeetingList?.pages.map((page) => {
        page.values.map((el: MeetingRoomType) => {
          newList.push(el);
        });
      })
    : allMeetingList?.pages.map((page) => {
        page.values.map((el: MeetingRoomType) => {
          if (el.category === isState) {
            newList.push(el);
          }
        });
      });

  console.log(newList);

  const { mutate: mutatePublic } = useMutation(postEnterMeetingRoom, {
    onSuccess: (data, { title, conferenceId }) => {
      userInfo && handleEnterRoom(title, conferenceId, userInfo.nickName, data);
    },
    onError: (error) => {
      // err.response.data.message ? alert(err.response.data.message) :
      alert(error);
    },
  });
  const { mutate: mutatePrivate } = useMutation(
    postCheckPasswordBeforeEnterMeetingRoom,
    {
      onSuccess: (data, { title, conferenceId }) => {
        userInfo &&
          handleEnterRoom(title, conferenceId, userInfo.nickName, data);
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

  if (allMeetingListIsLoading) return <Loading />;
  if (allMeetingListIsError) return <Navigate to={"/error"} />;

  return (
    <>
      {/* <div onScroll={onScroll} ref={viewRef} /> */}
      {isState && (
        <ItemList>
          {newList.map((el: MeetingRoomType) => {
            const { title, conferenceId, isPublic } = el;
            return userInfo ? (
              <ItemLink
                key={conferenceId}
                onClick={() => {
                  isPublic
                    ? (() => {
                        mutatePublic({
                          title,
                          conferenceId: conferenceId,
                        });
                      })()
                    : (() => {
                        const password =
                          prompt("비공개 방 비밀번호를 입력해주세요");
                        mutatePrivate({
                          title,
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

          <div ref={ref} />
        </ItemList>
      )}
    </>
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
