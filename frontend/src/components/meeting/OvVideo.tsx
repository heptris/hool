import React, { useEffect } from "react";
import { Publisher, Subscriber } from "openvidu-browser";

type PropsType = {
  streamManager: Publisher | Subscriber;
};

function OpenViduVideoComponent(props: PropsType) {
  const videoRef: React.RefObject<HTMLVideoElement> = React.createRef();

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

  return <video autoPlay={true} ref={videoRef} />;
}

export default OpenViduVideoComponent;
