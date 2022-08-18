import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Card from "./Card";

type PropsType = {
  emojiUrl: string;
  width?: number;
  height?: number;
};

function EmojiCard(props: PropsType) {
  /* 이미지 저장 방지 스크립트 */
  document.addEventListener(
    "contextmenu",
    (e: any) => e.target.matches("img") && e.preventDefault()
  );

  return (
    <ConcreteEmojiCard {...props}>
      <EmojiImg src={props.emojiUrl} />
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
