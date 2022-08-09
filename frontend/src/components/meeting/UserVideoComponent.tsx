import { Publisher, Subscriber } from "openvidu-browser";
import _ from "lodash";

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

  return (
    <div>
      {props.streamManager !== undefined ? (
        <StreamComponent>
          <VideoBox>
            <OpenViduVideoComponent streamManager={props.streamManager} />
            <NameBox>
              <p>{getNickNameTag()}</p>
            </NameBox>
          </VideoBox>
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
    background-color: ${_.sample([
      darkTheme.emphasisColor,
      darkTheme.darkBadgeColor,
      darkTheme.contrastColor,
    ])};
    border-radius: 4px;
    padding: 0.3rem 0.3rem;
  }
`;

export default UserVideoComponent;
