import styled from "styled-components";

import img from "assets/google-logo-img.png";

const ConferenceListItem = () => {
  return (
    <ListItem>
      <img src={img} alt="" />
      <ItemTitle>Item 제목</ItemTitle>
      <div>
        <p></p>
        <div>
          <i></i>
          <span></span>
          <span></span>
        </div>
      </div>
    </ListItem>
  );
};
const ListItem = styled.li``;
const ItemTitle = styled.h4``;
export default ConferenceListItem;
