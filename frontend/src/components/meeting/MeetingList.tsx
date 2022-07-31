import styled from "styled-components";

import MeetingListItem from "./MeetingListItem";

const MeetingList = () => {
  return (
    <ItemList>
      <MeetingListItem />
      <MeetingListItem />
      <MeetingListItem />
    </ItemList>
  );
};
const ItemList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 18rem);
`;
export default MeetingList;
