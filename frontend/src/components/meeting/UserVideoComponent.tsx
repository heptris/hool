import React from "react";
import { Publisher, Subscriber } from "openvidu-browser";

import OpenViduVideoComponent from "./OvVideo";

type PropsType = {
  streamManager: Publisher | Subscriber;
  mainVideoStream?: Function;
};

function UserVideoComponent(props: PropsType) {
  const getNickNameTag = () => {
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };

  const handleVideoClicked = (e: React.MouseEvent) => {
    if (props.mainVideoStream) {
      props.mainVideoStream(props.streamManager);
    }
  };

  return (
    <div>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div>
            <p>{getNickNameTag()}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserVideoComponent;
