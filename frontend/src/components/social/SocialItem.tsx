import { useState } from "react";
import { useNavigate } from "@tanstack/react-location";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import pdi1 from "assets/profile-default-imgs/1.png";
import pdi2 from "assets/profile-default-imgs/2.png";
import pdi3 from "assets/profile-default-imgs/3.jpg";
import pdi4 from "assets/profile-default-imgs/4.png";
import pdi5 from "assets/profile-default-imgs/5.jpg";
import pdi6 from "assets/profile-default-imgs/6.jpg";

import { FriendInfoType } from "types/FriendInfoType";

import Card from "components/commons/Card";
import { postAcceptFriend } from "api/social";
import { QUERY_KEYS } from "constant";

type PropsType = {
  isDisplayMyFriends: boolean;
} & FriendInfoType;

function SocialItem(props: PropsType) {
  const {
    friendConferenceDto,
    friendMemberEmail,
    friendMemberId,
    friendNickName,
    memberStatus,
    isDisplayMyFriends,
    friendRequestId,
  } = props;

  const profiles = [pdi1, pdi2, pdi3, pdi4, pdi5, pdi6];

  const [isDisplayOption, setIsDisplayOption] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate } = useMutation(postAcceptFriend, {
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEYS.FRIEND_MESSAGE_LIST]);
      queryClient.invalidateQueries([QUERY_KEYS.FRIEND_LIST]);
    },
  });
  const handlePostAcceptFriendMutate = (accept: boolean) => {
    friendRequestId && mutate({ accept, friendRequestId });
  };

  return (
    <SocialCard>
      <Status>
        <ProfileImg src={profiles[friendMemberId]} />
        <UserInfo>
          <Nickname>{friendNickName}</Nickname>
          <Email>{friendMemberEmail}</Email>
          <CurrentPos>{memberStatus}</CurrentPos>
        </UserInfo>
      </Status>
      <div>
        <MenuIcon
          onClick={() => {
            setIsDisplayOption(!isDisplayOption);
          }}
          className="fa-solid fa-ellipsis-vertical"
        ></MenuIcon>
        {isDisplayMyFriends && isDisplayOption && (
          <Menu>
            <button
              onClick={() => {
                navigate({
                  to: `/meeting/${friendConferenceDto?.friendConferenceId}`,
                  replace: true,
                });
                setIsDisplayOption(!isDisplayOption);
              }}
            >
              <p>친구 따라가기</p>
            </button>
          </Menu>
        )}
        {!isDisplayMyFriends && isDisplayOption && (
          <Menu>
            <div>
              <p onClick={() => handlePostAcceptFriendMutate(true)}>
                요청 승낙
              </p>
            </div>
            <Hr />
            <div>
              <p
                style={{ color: `${darkTheme.adaptiveGrey200}` }}
                onClick={() => handlePostAcceptFriendMutate(false)}
              >
                거절
              </p>
            </div>
          </Menu>
        )}
      </div>
    </SocialCard>
  );
}

const SocialCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  background-color: ${darkTheme.mainColor};
  max-width: 100%;
`;
const Status = styled.div`
  display: flex;
`;
const ProfileImg = styled.img`
  width: 5rem;
  border-radius: 5rem;
  margin: 1.5rem 0 1.5rem 1.5rem;
`;
const UserInfo = styled.div`
  align-self: center;
  margin: 0 0 0 2rem;
`;
const Nickname = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
`;
const Email = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  color: ${darkTheme.adaptiveGrey700};
  margin-bottom: 0.4rem;
`;
const CurrentPos = styled.span`
  font-size: 1rem;
  color: ${darkTheme.adaptiveGrey500};
`;
const MenuIcon = styled.i`
  width: 1rem;
  margin: 1rem 1rem 0 0;
  text-align: center;

  &:hover {
    cursor: pointer;
    color: ${darkTheme.adaptiveGrey200};
  }
`;
const Menu = styled.div`
  width: 9rem;
  background-color: ${darkTheme.darkColor};
  transform: translate(-50%, 0);
  position: absolute;
  margin-top: 0.3rem;
  border-radius: 4px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;

  a,
  div {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 60%;

      &:hover {
        cursor: pointer;
        background-color: ${darkTheme.adaptiveGrey500};
      }
    }
  }
`;
const Hr = styled.hr`
  border: 1px solid ${darkTheme.adaptiveGrey800};
  background-color: ${darkTheme.adaptiveGrey800};
  width: 100%;
  margin: 0;
`;

export default SocialItem;
