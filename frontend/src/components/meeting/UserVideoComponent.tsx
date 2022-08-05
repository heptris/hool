import React from "react";
import { Publisher, Subscriber } from "openvidu-browser";

import styled from "styled-components";
import { darkTheme } from "styles";

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
        <StreamComponent>
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <NameBox>
            <p>{getNickNameTag()}</p>
          </NameBox>
        </StreamComponent>
      ) : null}
    </div>
  );
}

const StreamComponent = styled.div`
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const NameBox = styled.div`
  display: flex;
  justify-content: center;

  p {
    background-color: ${darkTheme.emphasisColor};
    border-radius: 4px;
    padding: 0.3rem 0.3rem;
  }
`;

export default UserVideoComponent;
