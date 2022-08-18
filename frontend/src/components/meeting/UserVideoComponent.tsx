import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEmojiEvents } from "store";
import _ from "lodash";
import "animate.css";
import { Publisher, Subscriber } from "openvidu-browser";

import styled from "styled-components";
import { darkTheme } from "styles";

import type { RootState } from "store";

import OpenViduVideoComponent from "./OvVideo";

type PropsType = {
  idx: number;
  streamManager: Publisher | Subscriber;
  mainVideoStream?: Function;
};

function UserVideoComponent(props: PropsType) {
  const { idx, streamManager, mainVideoStream } = props;

  /* 이미지 저장 방지 스크립트 */
  document.addEventListener(
    "contextmenu",
    (e: any) => e.target.matches("img") && e.preventDefault()
  );

  const [isDisplayingEmoji, setIsDisplayingEmoji] = useState(false);

  const dispatch = useDispatch();
  const { emojiEvents } = useSelector(
    (state: RootState) => state.clientSession
  );

  /* 이모지 이벤트 처리 로직 */
  const [emojiData, setEmojiData] = useState("");
  useEffect(() => {
    if (emojiEvents[idx] === "") return;

    setEmojiData(emojiEvents[idx]);
  }, [emojiEvents]);
  const [sender, emojiUrl, emojiAnimate] = emojiData.split("::");
  useEffect(() => {
    if (emojiData === "") return;

    setIsDisplayingEmoji(true);

    setTimeout(() => {
      setIsDisplayingEmoji(false);

      const newEmojiEvents = emojiEvents.map((emo, i) =>
        idx === i ? "" : emo
      );
      dispatch(setEmojiEvents(newEmojiEvents));
    }, 4000);
  }, [emojiData]);

  const getNickNameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  // LazyFunction
  const pickRandomColor = () => {
    return _.sample([
      darkTheme.emphasisColor,
      darkTheme.darkBadgeColor,
      darkTheme.contrastColor,
      "#9bb7d4",
      "#c74375",
      "#bf1932",
      "#e2583e",
      "#9b1b30",
      "#5a5b9f",
      "#009473",
      "#5f4b8b",
      "#0f4c81",
    ]);
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <StreamComponent>
          <VideoBox>
            {isDisplayingEmoji && (
              <EmojiDivision>
                <Emoji
                  src={emojiUrl}
                  className={`animate__animated ${emojiAnimate}`}
                />
              </EmojiDivision>
            )}
            <OpenViduVideoComponent streamManager={streamManager} />
            <NameBox pickRandomColor={pickRandomColor}>
              <p>{getNickNameTag()}</p>
            </NameBox>
          </VideoBox>
        </StreamComponent>
      ) : null}
    </div>
  );
}

const StreamComponent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const VideoBox = styled.div`
  position: relative;
`;
const NameBox = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 8px;
  left: 8px;

  p {
    background-color: ${(props: { pickRandomColor: Function }) =>
      props.pickRandomColor()};
    border-radius: 4px;
    padding: 0.3rem 0.3rem;
  }
`;
const EmojiDivision = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  z-index: 5000;
`;
const Emoji = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default UserVideoComponent;
