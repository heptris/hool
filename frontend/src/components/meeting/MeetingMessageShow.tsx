import styled from "styled-components";
import { darkTheme } from "styles/Theme";
import { MessageBox } from "./MeetingMessageInput";
import { IconStyle } from "styles/IconStyle";
import profileDefaultImg from "assets/profile-default-imgs/1.png";
import { useSelector } from "react-redux";
import { RootState } from "store";

const MeetingMessageShow = () => {
  const isShowingGame = useSelector(
    (state: RootState) => state.navbar.isShowingGame
  );
  return (
    <>
      <MessageShowTopBox isShowingGame={isShowingGame}>
        <Icon className="fa-solid fa-comment" />
        <h1>Chat</h1>
      </MessageShowTopBox>
      <MessageShowBottomBox isShowingGame={isShowingGame}>
        <UserBox>
          <ProfileImg
            src={profileDefaultImg}
            alt={`${profileDefaultImg}의 프로필 이미지`}
          />
          <UserInfoMessageBox>
            <UsernameText>Andrew</UsernameText>
            <MessageTextBox>
              <MessageText>안녕하세요ㅎㅎ</MessageText>
            </MessageTextBox>
          </UserInfoMessageBox>
        </UserBox>
      </MessageShowBottomBox>
    </>
  );
};

const MessageShowTopBox = styled(MessageBox)`
  height: 3rem;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: ${darkTheme.mainColor};
  margin-top: ${(props) =>
    props.isShowingGame ? "1rem" : "0rem"}; //  게임 컴포넌트 없을때,
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MessageShowBottomBox = styled(MessageBox)`
  margin-top: 0rem;
  height: ${(props) =>
    props.isShowingGame ? "52%" : "100%"}; //게임 컴포넌트 없을때,
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: ${darkTheme.adaptiveGrey800};
`;

const Icon = styled.i`
  ${IconStyle}
  font-size:2rem;
  margin-right: 1rem;
`;

const UserBox = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImg = styled.img`
  height: 3rem;
  border-radius: 4px;
  margin-right: 1rem;
`;

const UserInfoMessageBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const UsernameText = styled.h1`
  font-size: 0.8rem;
  color: ${darkTheme.adaptiveGrey600};
  margin-bottom: 0.3rem;
`;

const MessageTextBox = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;

  background-color: ${darkTheme.adaptiveGrey900};
  border-radius: 8px;
  box-sizing: border-box;
`;

const MessageText = styled.h1`
  font-size: 0.8rem;
  padding: 0.5rem;
`;

export default MeetingMessageShow;
