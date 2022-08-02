import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import img from "assets/thumbnail_soccer_1920.jpg";
import Card from "components/commons/Card";

const ConferenceListItem = () => {
  return (
    <ListItem bgColor={darkTheme.mainColor}>
      <Thumbnail src={img} alt="" />
      <ItemTitle>Item 제목</ItemTitle>
      <div>
        <ItemDesc>Item 설명</ItemDesc>
        <InfoWrapper>
          <Icon className="fa-solid fa-users" />
          <Population>인원</Population>
          <Time>시간</Time>
        </InfoWrapper>
      </div>
    </ListItem>
  );
};
const ListItem = styled(Card)`
  padding: 1rem;
  box-sizing: border-box;
  height: fit-content;
  cursor: pointer;
  &:hover {
    background-color: ${darkTheme.adaptiveGrey800};
  }
`;
const ItemTitle = styled.h4`
  margin-top: 1rem;
  font-size: 2rem;
`;
const Thumbnail = styled.img`
  width: 100%;
`;
const ItemDesc = styled.p`
  margin-top: 1rem;
`;
const InfoWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
`;
const Icon = styled.i`
  margin-right: 0.5rem;
`;
const Population = styled.span`
  margin-right: 0.5rem;
`;
const Time = styled.span``;
export default ConferenceListItem;
