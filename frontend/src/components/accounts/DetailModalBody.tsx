import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";
import EmojiCard from "components/commons/EmojiCard";
import { DetailType } from "components/accounts/Inventory";

function DetailModalBody({
  emojiTitle,
  ARCode,
  author,
  description,
  isFav,
}: DetailType) {
  return (
    <FlexBox>
      <Imgs>
        <NonClickableEmojiCard width={6.25} height={6.25}>
          <></>
        </NonClickableEmojiCard>
        {ARCode && <ARImg src={ARCode}></ARImg>}
      </Imgs>
      <EmojiTitle>{emojiTitle}</EmojiTitle>
      <Author>{author}</Author>
      <Description>{description}</Description>
      {!isFav && <FavBtn width={7} height={3} text={"즐겨찾기 등록"} />}
      {isFav && <FavBtn width={7} height={3} text={"즐겨찾기 해제"} />}
    </FlexBox>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`;
const Imgs = styled.div`
  display: flex;
`;
const NonClickableEmojiCard = styled(EmojiCard)`
  width: 6.25rem;
  height: 6.25rem;

  &:hover {
    cursor: default;
    outline: 0;
    background-color: ${darkTheme.darkColor};
  }
`;
const ARImg = styled.img`
  width: 2rem;
  height: 2rem;
  background-color: ${darkTheme.white};
  position: absolute;
  margin-top: calc(6.25rem - 2.2rem);
  margin-left: calc(6.25rem + 0.5rem);
`;
const EmojiTitle = styled.h1`
  margin-top: 2rem;
  font-size: 1.25rem;
`;
const Author = styled.h2`
  margin-top: 0.5rem;
  font-weight: normal;
  color: ${darkTheme.adaptiveGrey500};
`;
const Description = styled.p`
  margin-top: 2rem;
  color: ${darkTheme.adaptiveGrey200};
`;
const FavBtn = styled(Button)`
  background-color: ${darkTheme.darkColor};
  margin-top: 2rem;

  &:hover {
    background-color: ${darkTheme.emphasisColor};
  }
`;

export default DetailModalBody;
