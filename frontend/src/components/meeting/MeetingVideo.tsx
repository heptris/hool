import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const VideoBox = styled.div`
  width: 31.25rem;
  height: 19rem;
  background-color: ${darkTheme.white};
`;

const MeetingVideo = () => {
  return <VideoBox></VideoBox>;
};

export default MeetingVideo;
