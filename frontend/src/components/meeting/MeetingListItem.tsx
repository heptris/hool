import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import img from "assets/google-logo-img.png";

const ConferenceListItem = () => {
  return (
    <ListItem>
      <Thumbnail src={img} alt="" />
      <ItemTitle>Item 제목</ItemTitle>
      <div>
        <ItemDesc>Item 설명</ItemDesc>
        <InfoWrapper>
          <Icon>사람아이콘</Icon>
          <Population>인원</Population>
          <Time>시간</Time>
        </InfoWrapper>
      </div>
    </ListItem>
  );
};
const ListItem = styled.div`
  border: 1px solid ${darkTheme.adaptiveGrey200};
  padding: 1rem;
  box-sizing: border-box;
  height: fit-content;
`;
const ItemTitle = styled.h4`
  margin-top: 1rem;
  font-size: 2rem;
`;
const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 50%;
  overflow: hidden;
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
