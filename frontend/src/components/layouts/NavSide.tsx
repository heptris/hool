import { Link } from "@tanstack/react-location";
import { useDispatch, useSelector } from "react-redux";

import styled, { css } from "styled-components";
import { darkTheme } from "styles/Theme";

import { QUERY_KEYS, ROUTES_NAME } from "constant";

import {
  RootState,
  setIsCreatingRoom,
  setIsCreatingGame,
  setIsShowingMessage,
  setAudioEnabled,
  setVideoEnabled,
  setIsCreatingPreferences,
  setIsShowingGameSubmit,
} from "store";
import { useQueryClient } from "@tanstack/react-query";
import { UserInfoType } from "types/UserInfoType";

const { adaptiveGrey200, adaptiveGrey800, adaptiveGrey700, bgColor } =
  darkTheme;
const { MAIN, MEETING, SOCIAL, MARKET } = ROUTES_NAME;

const NavSide = () => {
  const userInfo = useQueryClient().getQueryData<UserInfoType>([
    QUERY_KEYS.USER,
  ]);

  const dispatch = useDispatch();

  const openCreatingModal = () => {
    dispatch(setIsCreatingRoom(true));
  };
  const openCreatingGameModal = () => {
    dispatch(setIsCreatingGame(true));
  };
  const openCreatingPreferencesModal = () => {
    dispatch(setIsCreatingPreferences(true));
  };

  const { navMode, isResultMode, isShowingGameSubmit } = useSelector(
    (state: RootState) => state.navbar
  );

  const { audioEnabled, videoEnabled, isHost } = useSelector(
    (state: RootState) => state.clientSession
  );

  const audioEnabledHandler = () => {
    if (audioEnabled) dispatch(setAudioEnabled(false));
    else dispatch(setAudioEnabled(true));
  };
  const videoEnabledHandler = () => {
    if (videoEnabled) dispatch(setVideoEnabled(false));
    else dispatch(setVideoEnabled(true));
  };

  const isShowingMessage = useSelector(
    (state: RootState) => state.navbar.isShowingMessage
  );

  const showMessageHandler = () => {
    if (isShowingMessage) dispatch(setIsShowingMessage(false));
    else dispatch(setIsShowingMessage(true));
  };

  const handleGameResultSubmitModal = () => {
    if (isShowingGameSubmit) dispatch(setIsShowingGameSubmit(false));
    else dispatch(setIsShowingGameSubmit(true));
  };

  return (
    <Side>
      <NavLink to={MAIN}>
        <Logo>hool!</Logo>
      </NavLink>
      <ButtonGroup>
        <div>
          <Buttons>
            {navMode === "meetingRoom" ? (
              <>
                <UtilButton onClick={audioEnabledHandler}>
                  <AudioBtn audioEnabled={audioEnabled}>
                    {audioEnabled ? (
                      <Icon className="fa-solid fa-microphone" />
                    ) : (
                      <Icon className="fa-solid fa-microphone-slash" />
                    )}
                  </AudioBtn>
                </UtilButton>
                <UtilButton onClick={videoEnabledHandler}>
                  <VideoBtn videoEnabled={videoEnabled}>
                    {videoEnabled ? (
                      <Icon className="fa-solid fa-video" />
                    ) : (
                      <Icon className="fa-solid fa-video-slash" />
                    )}
                  </VideoBtn>
                </UtilButton>
                <UtilButton onClick={showMessageHandler}>
                  <Btn>
                    <Icon className="fa-solid fa-comment" />
                  </Btn>
                </UtilButton>
                {isHost &&
                  (isResultMode ? (
                    <UtilButton onClick={handleGameResultSubmitModal}>
                      <Btn>
                        <Icon className="fa-solid fa-file-export" />
                      </Btn>
                    </UtilButton>
                  ) : (
                    <UtilButton onClick={openCreatingGameModal}>
                      <Btn>
                        <Icon className="fa-solid fa-gamepad" />
                      </Btn>
                    </UtilButton>
                  ))}
              </>
            ) : (
              <>
                <NavLink to={MEETING}>
                  <Btn>
                    <Icon className="fa-solid fa-list" />
                  </Btn>
                </NavLink>
                <NavLink to={SOCIAL}>
                  <Btn>
                    <Icon className="fa-solid fa-users" />
                  </Btn>
                </NavLink>
                <NavLink to={MARKET}>
                  <Btn>
                    <Icon className="fa-solid fa-face-grin-wide" />
                  </Btn>
                </NavLink>
                {userInfo && (
                  <UtilButton onClick={openCreatingModal}>
                    <Btn>
                      <Icon className="fa-solid fa-plus" />
                    </Btn>
                  </UtilButton>
                )}
              </>
            )}
            <UtilButton onClick={openCreatingPreferencesModal}>
              <Btn>
                <Icon className="fa-solid fa-gear" />
              </Btn>
            </UtilButton>
          </Buttons>
        </div>
        {navMode === "meetingRoom" && (
          <div>
            <Link to={MEETING}>
              <Btn>
                <Icon className="fa-solid fa-arrow-right-from-bracket" />
              </Btn>
            </Link>
          </div>
        )}
      </ButtonGroup>
    </Side>
  );
};
const Side = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 5;
  margin: 0 auto;
  height: 100vh;
  width: 3rem;
  background-color: ${bgColor};
`;
const ButtonStyle = css`
  text-decoration: none;
  margin-bottom: 1.75rem;
`;
const NavLink = styled(Link)`
  ${ButtonStyle}
`;
const UtilButton = styled.div`
  ${ButtonStyle}
`;
const Logo = styled.h1`
  font-family: "Lobster", cursive;
  font-size: 2rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;
const ButtonGroup = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 3.5rem;
  margin-bottom: 3rem;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Btn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 4px;
  background-color: ${adaptiveGrey800};
  cursor: pointer;

  &:hover {
    background-color: ${adaptiveGrey700};
  }
`;
const AudioBtn = styled(Btn)`
  background-color: ${(props: { audioEnabled: boolean }) =>
    props.audioEnabled ? "#292B3B" : "#FF0090"};
`;
const VideoBtn = styled(Btn)`
  background-color: ${(props: { videoEnabled: boolean }) =>
    props.videoEnabled ? "#292B3B" : "#FF0090"};
`;
const Icon = styled.span`
  font-size: 1rem;
  color: ${adaptiveGrey200};
`;

export default NavSide;
