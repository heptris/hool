import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import img from "assets/thumbnail_soccer_1920.jpg";
import Card from "components/commons/Card";
import { MeetingRoomType } from "types/MeetingRoomType";

const { infoColor } = darkTheme;

const ConferenceListItem = (props: MeetingRoomType) => {
  const { category, description, title, total, isPublic } = props;
  return (
    <ListItem bgColor={darkTheme.mainColor}>
      <Thumbnail src={img} alt="" />
      <ItemTitle>{title}</ItemTitle>
      <ItemDescWrapper>
        <div>
          <ItemDesc>{description}</ItemDesc>
          <InfoWrapper>
            <Icon className="fa-solid fa-users" />
            <Population>{total} 명</Population>
            <Time>{category}</Time>
          </InfoWrapper>
        </div>
        <Public isPublic={isPublic}>{isPublic ? "공개" : "비공개"}</Public>
      </ItemDescWrapper>
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
const Public = styled.span`
  color: ${({ isPublic }: { isPublic: boolean }) => isPublic && infoColor};
`;
const ItemDescWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
export default ConferenceListItem;
