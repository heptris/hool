import React, { useEffect } from "react";
import { Publisher, Subscriber } from "openvidu-browser";

import styled from "styled-components";

type PropsType = {
  streamManager: Publisher | Subscriber;
};

function OpenViduVideoComponent(props: PropsType) {
  const videoRef: React.RefObject<HTMLVideoElement> = React.useRef(null);

  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current as HTMLVideoElement);
    }
  });

  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current as HTMLVideoElement);
    }
  }, []);

  return <Video autoPlay={true} ref={videoRef} />;
}

const Video = styled.video`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
`;

export default OpenViduVideoComponent;
