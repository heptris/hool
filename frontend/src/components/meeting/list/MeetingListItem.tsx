import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import soccerImg from "assets/meeting-Imgs/soccer-img.jpg";
import baseballImg from "assets/meeting-Imgs/baseball-img.jpg";
import basketballImg from "assets/meeting-Imgs/basketball-img.jpg";
import volleyballImg from "assets/meeting-Imgs/volleyball-img.jpg";
import esportsImg from "assets/meeting-Imgs/esports-img.jpg";
import Card from "components/commons/Card";
import { MeetingRoomType } from "types/MeetingRoomType";

const MAX_POPULATION = 9;

const ConferenceListItem = (props: MeetingRoomType) => {
  const { category, description, title, total, isPublic, nickName } = props;
  const categoryToDisplay = (category: string) => {
    if (category === "SOCCER") return "축구";
    if (category === "BASEBALL") return "야구";
    if (category === "BASKETBALL") return "농구";
    if (category === "VOLLEYBALL") return "배구";
    if (category === "E-Sports") return "E-sports";
  };

  return (
    <ListItem bgColor={darkTheme.mainColor}>
      <ThumbnailDivision>
        {category === "SOCCER" && <Thumbnail src={soccerImg} alt="soccerImg" />}
        {category === "BASEBALL" && (
          <Thumbnail src={baseballImg} alt="baseballImg" />
        )}
        {category === "BASKETBALL" && (
          <Thumbnail src={basketballImg} alt="basketballImg" />
        )}
        {category === "VOLLEYBALL" && (
          <Thumbnail src={volleyballImg} alt="volleyballImg" />
        )}
        {category === "ESPORTS" && (
          <Thumbnail src={esportsImg} alt="esportsImg" />
        )}
        <CategoryTag>{categoryToDisplay(category)}</CategoryTag>
        <PublicTag isPublic={isPublic}>
          {isPublic ? "공개" : "비공개"}
        </PublicTag>
      </ThumbnailDivision>
      <ItemTitle>{title}</ItemTitle>
      <ItemDesc>{description}</ItemDesc>
      <ItemDescWrapper>
        <div>
          <InfoWrapper>
            <Icon className="fa-solid fa-users" />
            <Population>
              {total}/{MAX_POPULATION}
            </Population>
            <CreatorInfo>· {nickName}</CreatorInfo>
          </InfoWrapper>
        </div>
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
  line-height: normal;
  margin-top: 0.3rem;
  font-size: 1.5rem;
  color: ${darkTheme.white};
`;
const ThumbnailDivision = styled.div`
  position: relative;
`;
const Thumbnail = styled.img`
  width: 100%;
  border-radius: 4px;
`;
const ItemDesc = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: normal;
  margin: 0.5rem 0;
  font-size: 1rem;
  color: ${darkTheme.adaptiveGrey200};
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
  font-size: 1rem;
`;
const CategoryTag = styled.div`
  background-color: ${darkTheme.emphasisColor};
  /* border: 5px double; */
  border-radius: 5rem;
  padding: 0.2rem 0.7rem;
  font-size: 0.9rem;
  text-align: center;
  color: ${darkTheme.white};
  position: absolute;
  top: 4px;
  left: 4px;
`;
const PublicTag = styled.div`
  width: 2.7rem;
  text-align: center;
  /* border: 3px outset ${darkTheme.adaptiveGrey700}; */
  background-color: ${darkTheme.black};
  padding: 0.4rem;
  border-radius: 4px;
  color: ${({ isPublic }: { isPublic: boolean }) =>
    isPublic ? darkTheme.infoColor : darkTheme.contrastColor};
  position: absolute;
  bottom: 4px;
  right: 4px;
`;
const ItemDescWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const CreatorInfo = styled.div`
  width: 10rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ConferenceListItem;
