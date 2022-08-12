import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Card from "./Card";

type PropsType = {
  imgUrl: string;
  width?: number;
  height?: number;
};

function EmojiCard(props: PropsType) {
  return (
    <ConcreteEmojiCard {...props}>
      <EmojiImg src={props.imgUrl} />
    </ConcreteEmojiCard>
  );
}

const ConcreteEmojiCard = styled(Card)`
  width: ${({ width }: PropsType) => `${width || 4}`}rem;
  height: ${({ height }: PropsType) => `${height || 4}`}rem;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    outline: 2px solid ${darkTheme.mainBadgeColor};
    background-color: ${darkTheme.mainColor};
  }
`;
const EmojiImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default EmojiCard;
