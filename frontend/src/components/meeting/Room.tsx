import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const RoomBox = styled.div`
  width: 43.17rem;
  height: 19rem;
  float: left;
  background-color: ${darkTheme.white};
`;

const Room = () => {
  return <RoomBox></RoomBox>;
};

export default Room;
