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
  grid-template-columns: repeat(auto-fit, 20rem);
  grid-gap: 2rem;
  padding-top: 5rem;
  justify-content: center;
  margin: auto;
`;
export default MeetingList;
