import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import { postSearchFriend } from "api/social";

import PageHeader from "components/commons/PageHeader";
import SearchBar from "components/commons/SearchBar";
import Card from "components/commons/Card";

type PropsType = {
  isDisplayMyFriends: boolean;
  setIsDisplayMyFriends: Function;
};

const SocialSearchBar = () => {
  const [searchName, setSearchName] = useState("");
  const { mutate, isSuccess, isError, data } = useMutation(postSearchFriend);

  const handleSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    mutate({ friendNickName: searchName });
  }, [searchName]);

  return (
    <SearchBar
      inputValue={searchName}
      searchPlaceholder="친구 검색"
      inputOnChange={handleSearchName}
      SearchListComponent={(() => {
        if (searchName && isError)
          return <Card>존재하지 않는 사용자입니다.</Card>;
        if (isSuccess)
          return (
            <Card>
              <strong>사용자 닉네임 : {data.data.friendNickName}</strong>
              <p>사용자 메일 : {data.data.friendMemberEmail}</p>
            </Card>
          );
      })()}
    />
  );
};

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
