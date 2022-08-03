import styled from "styled-components";

import MeetingListItem from "./MeetingListItem";

const MeetingList = () => {
  return (
    <ItemList>
      <MeetingListItem />
      <MeetingListItem />
      <MeetingListItem />
      <MeetingListItem />
      <MeetingListItem />
      <MeetingListItem />
      <MeetingListItem />
      <MeetingListItem />
      <MeetingListItem />
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
