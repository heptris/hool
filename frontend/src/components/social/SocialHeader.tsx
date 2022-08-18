import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import { postSearchFriend, postSendFriendSendMessage } from "api/social";

import Alert from "components/commons/Alert";
import PageHeader from "components/commons/PageHeader";
import SearchBar from "components/commons/SearchBar";
import Card from "components/commons/Card";
import Button from "components/commons/Button";
import MyFriends from "./MyFriends";

import { QUERY_KEYS } from "constant";

import type { UserInfoType } from "types/UserInfoType";
import type { FriendInfoType } from "types/FriendInfoType";

const ALERT_DISPLAYING_TIME = 4000;

type PropsType = {
  isDisplayMyFriends: boolean;
  setIsDisplayMyFriends: Function;
};

const SocialSearchBar = () => {
  const queryClient = useQueryClient();
  const userInfo: UserInfoType | undefined = queryClient.getQueryData([
    QUERY_KEYS.USER,
  ]);
  const myFriends: { data: FriendInfoType[] } | undefined =
    queryClient.getQueryData([QUERY_KEYS.FRIEND_LIST]);

  /* Alert 보일러플레이트 */
  const [isDisplayAlert, setIsDisplayAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msgToDisplay, setMsgToDisplay] = useState("");

  const [searchName, setSearchName] = useState("");
  const {
    mutate: mutateSearchFriend,
    isSuccess: isSearchFriendSuccess,
    isError: isSearchFriendError,
    data: searchFriendData,
  } = useMutation(postSearchFriend);
  const { mutate: mutateFriendSend } = useMutation(postSendFriendSendMessage, {
    onSuccess: () => {
      setIsDisplayAlert(true);
      setIsSuccess(true);
      setMsgToDisplay("친구 요청 보내기 성공!");
      setSearchName("");
    },
  });

  const handleSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    if (searchName === "") return;

    mutateSearchFriend({ friendNickName: searchName });
  }, [searchName]);

  return (
    <>
      {isDisplayAlert && (
        <Alert
          isDisplayAlert={isDisplayAlert}
          handleDisplayAlert={setIsDisplayAlert}
          displayTimeInMs={ALERT_DISPLAYING_TIME}
          msgToDisplay={msgToDisplay}
          isSuccess={isSuccess}
        />
      )}
      <SearchBar
        inputValue={searchName}
        searchPlaceholder="사용자 검색"
        inputOnChange={handleSearchName}
        SearchListComponent={(() => {
          // if (searchName === userInfo?.nickName)
          //   return <SearchResModal>본인입니다</SearchResModal>;
          if (searchName && searchFriendData?.data.length === 0)
            return (
              <SearchResModal>검색 결과가 존재하지 않아요.</SearchResModal>
            );
          if (searchName && isSearchFriendSuccess)
            return (
              <SearchResModal>
                {searchFriendData.data.map((res: FriendInfoType) => (
                  <FriendCard key={res.friendMemberId}>
                    <InfoDivision>
                      <FriendProfileImg src={res.friendProfile} />
                      <FriendInfo>
                        <FriendNickName>{res.friendNickName}</FriendNickName>
                        <FriendEmail>{res.friendMemberEmail}</FriendEmail>
                      </FriendInfo>
                    </InfoDivision>

                    {userInfo?.nickName !== res.friendNickName &&
                      !myFriends?.data
                        .map((friend) => friend.friendMemberId)
                        .includes(res.friendMemberId) && (
                        <Button
                          width={4}
                          height={2}
                          text={"친구 요청"}
                          fontSize={0.825}
                          buttonOnClick={() => {
                            mutateFriendSend({
                              friendMemberId: res.friendMemberId,
                            });
                          }}
                        />
                      )}
                  </FriendCard>
                ))}
                {/* <div>
                <img src={searchFriendData.data.friendProfile} alt="" />
                <strong>{searchFriendData.data[0].friendNickName}</strong>
                <p>{searchFriendData.data[0].friendMemberEmail}</p>
              </div> */}
                {/* {myFriends &&
                !myFriends.data
                  .map((el: FriendInfoType) => el?.friendMemberId)
                  .includes(searchFriendData.data.friendMemberId) && (
                  <Button
                    width={4}
                    height={2}
                    text={"친구 요청"}
                    fontSize={0.825}
                    buttonOnClick={() => {
                      mutateFriendSend(searchFriendData.data.friendMemberId);
                    }}
                  />
                )} */}
              </SearchResModal>
            );
        })()}
      />
    </>
  );
};
const SearchResModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${darkTheme.mainColor};
  border: none;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  align-items: center;
  padding: 1rem;
`;
const FriendCard = styled(Card)`
  width: 100%;
  background-color: transparent;
  border: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const InfoDivision = styled.div`
  display: flex;
`;
const FriendProfileImg = styled.img`
  width: 3rem;
  border-radius: 4rem;
`;
const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`;
const FriendNickName = styled.h1`
  width: 10rem;
  margin-bottom: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const FriendEmail = styled.h2`
  width: 10rem;
  font-size: 0.825rem;
  font-weight: normal;
  color: ${darkTheme.adaptiveGrey500};
  overflow: hidden;
  text-overflow: ellipsis;
`;

function SocialHeader({
  isDisplayMyFriends,
  setIsDisplayMyFriends,
}: PropsType) {
  const queryClient = useQueryClient();

  const friendMessageList: { data: FriendInfoType[] } | undefined =
    queryClient.getQueryData([QUERY_KEYS.FRIEND_MESSAGE_LIST]);

  return (
    <PageHeader
      pageTitle="친구 찾기"
      subtext="친구와 함께하면 즐거움이 두배에요."
      isDisplaySearchBar={true}
      isDisplayBtn={false}
      isDisplayInfo={true}
      concreteInfo={
        <Switches>
          <SwitchItem
            style={
              isDisplayMyFriends
                ? {
                    background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                  }
                : {}
            }
            onClick={() => {
              setIsDisplayMyFriends(true);
            }}
          >
            <span
              style={
                isDisplayMyFriends ? { color: darkTheme.mainBadgeColor } : {}
              }
            >
              내친구
            </span>
          </SwitchItem>
          <SwitchItem
            style={
              isDisplayMyFriends
                ? {}
                : {
                    background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                  }
            }
            onClick={() => {
              setIsDisplayMyFriends(false);
            }}
          >
            <span
              style={
                isDisplayMyFriends ? {} : { color: darkTheme.mainBadgeColor }
              }
            >
              내게 온 친구요청({friendMessageList?.data.length})
            </span>
          </SwitchItem>
        </Switches>
      }
      SearchBar={<SocialSearchBar />}
    />
  );
}

const Switches = styled.div``;

const SwitchItem = styled.button`
  background-color: transparent;
  margin: 0 2rem 0 0;
  padding: 0 0 0.25rem 0;

  &:hover {
    cursor: pointer;

    span {
      color: ${darkTheme.adaptiveGrey200};
    }
  }
`;

export default SocialHeader;
