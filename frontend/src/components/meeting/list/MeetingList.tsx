import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { getMeetingList } from "api/meeting";

import MeetingListItem from "./MeetingListItem";
import { MeetingRoomType } from "types/MeetingRoomType";
import Loading from "components/Loading";
import { Link, Navigate } from "@tanstack/react-location";

const MeetingList = () => {
  const { status, data, isLoading, isError } = useQuery(["meetings"], () =>
    getMeetingList()
  );

  if (isLoading) return <Loading />;
  if (isError) return <Navigate to={"/error"} />;

  return (
    <ItemList>
      {data.data.map((el: MeetingRoomType) => (
        <Link to={`meeting/${el.conferenceId}`} key={el.conferenceId}>
          <MeetingListItem {...el} />
        </Link>
      ))}
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
