import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import img from "assets/thumbnail_soccer_1920.jpg";
import Card from "components/commons/Card";
import { MeetingRoomType } from "types/MeetingRoomType";

const ConferenceListItem = (props: MeetingRoomType) => {
  const { category, description, title, total, isPublic } = props;
  return (
    <ListItem bgColor={darkTheme.mainColor}>
      <Thumbnail src={img} alt="" />
      <ItemTitle>{title}</ItemTitle>
      <ItemDesc>{description}</ItemDesc>
      <ItemDescWrapper>
        <div>
          <Time>{category}</Time>
          <InfoWrapper>
            <Icon className="fa-solid fa-users" />
            <Population>{total} 명</Population>
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 1rem;
  font-size: 1.7rem;
  color: ${darkTheme.mainBadgeColor};
`;
const Thumbnail = styled.img`
  width: 100%;
`;
const ItemDesc = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1rem 0;
  font-size: 1.2rem;
`;
const InfoWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
`;
const Icon = styled.i`
  margin-right: 0.5rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const Population = styled.span`
  margin-right: 0.5rem;
  color: ${darkTheme.adaptiveGrey200};
  font-size: 0.9rem;
`;
const Time = styled.div`
  width: 6rem;
  border: 5px double;
  border-radius: 5rem;
  padding: 0.2rem;
  font-size: 0.9rem;
  text-align: center;
  color: ${darkTheme.emphasisColor};
`;
const Public = styled.div`
  width: 2.7rem;
  text-align: center;
  border: 3px outset ${darkTheme.adaptiveGrey700};
  padding: 0.4rem;
  border-radius: 4px;
  color: ${({ isPublic }: { isPublic: boolean }) =>
    isPublic ? darkTheme.infoColor : darkTheme.contrastColor};
`;
const ItemDescWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
export default ConferenceListItem;
