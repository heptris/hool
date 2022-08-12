import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import { postSearchFriend, postSendFriendSendMessage } from "api/social";

import PageHeader from "components/commons/PageHeader";
import SearchBar from "components/commons/SearchBar";
import Card from "components/commons/Card";
import Button from "components/commons/Button";

import { QUERY_KEYS } from "constant";

import { UserInfoType } from "types/UserInfoType";
import { FriendInfoType } from "types/FriendInfoType";
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
  const [searchName, setSearchName] = useState("");
  const {
    mutate: mutateSearchFriend,
    isSuccess: isSearchFriendSuccess,
    isError: isSearchFriendError,
    data: searchFriendData,
  } = useMutation(postSearchFriend);
  const { mutate: mutateFriendSend } = useMutation(postSendFriendSendMessage, {
    onSuccess: () => {
      setSearchName("");
    },
  });

  const handleSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    mutateSearchFriend({ friendNickName: searchName });
  }, [searchName]);
  console.log(searchFriendData, myFriends);

  return (
    <SearchBar
      inputValue={searchName}
      searchPlaceholder="친구 검색"
      inputOnChange={handleSearchName}
      SearchListComponent={(() => {
        if (searchName === userInfo?.nickName)
          return <CustomFriendCard>본인입니다</CustomFriendCard>;
        if (searchName && isSearchFriendError)
          return (
            <CustomFriendCard>존재하지 않는 사용자입니다.</CustomFriendCard>
          );
        if (isSearchFriendSuccess)
          return (
            <CustomFriendCard>
              <div>
                <strong>
                  사용자 닉네임 : {searchFriendData.data.friendNickName}
                </strong>
                <p>사용자 메일 : {searchFriendData.data.friendMemberEmail}</p>
              </div>
              {myFriends &&
                !myFriends.data
                  .map((el: FriendInfoType) => el?.friendMemberId)
                  .includes(searchFriendData.data.friendMemberId) && (
                  <Button
                    height={2}
                    width={2}
                    text={"친구 요청"}
                    fontSize={0.8}
                    buttonOnClick={() => {
                      mutateFriendSend(searchFriendData.data.friendMemberId);
                    }}
                  />
                )}
            </CustomFriendCard>
          );
      })()}
    />
  );
};
const CustomFriendCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

function SocialHeader({
  isDisplayMyFriends,
  setIsDisplayMyFriends,
}: PropsType) {
  return (
    <PageHeader
      pageTitle="친구찾기"
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
              친구요청
            </span>
          </SwitchItem>
        </Switches>
      }
      SearchBar={<SocialSearchBar />}
    ></PageHeader>
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
