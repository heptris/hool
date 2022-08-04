import OpvSession from "openvidu-react";
import axios from "axios";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const VideoBox = styled.div`
  width: 31.25rem;
  height: 19rem;
  background-color: ${darkTheme.white};
`;

const MeetingVideo = () => {
  return <OpvSession></OpvSession>;
};

export default MeetingVideo;
