import { useState } from "react";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";
import { letterSpacingSize } from "styles/GlobalStyle";

function Social() {
  const [isDisplayMyFriends, setIsDisplayMyFriends] = useState(true);

  const myFriends = [
    { nickname: "Thomas", curPos: "일본 vs 대한민국 같이봐요", status: "live" },
    { nickname: "Bell", curPos: "접속중", status: "loggedIn" },
    { nickname: "Dijkstra", curPos: "12 minutes ago", status: "loggedOut" },
  ];

  const requests = [{ nickname: "Ronaldo", msg: "친해지고싶어요." }];

  const searchRes = [{ nickname: "Kruskal", email: "mst@gmail.com" }];

  return (
    <>
      <SocialHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <HeaderText>친구찾기</HeaderText>
          <SearchBar tabIndex={1}>
            <MagIcon className="fa-solid fa-magnifying-glass"></MagIcon>
            <SearchInput type="text" placeholder="친구 검색" />
          </SearchBar>
        </div>

        <SubText>친구와 함께하면 즐거움이 두배에요.</SubText>

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
        <Hr />
      </SocialHeader>
      {isDisplayMyFriends && <MyFriends></MyFriends>}
      {!isDisplayMyFriends && <Requests></Requests>}
    </>
  );
}

const SocialHeader = styled.div`
  width: 83.33333%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderText = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 2rem 0;
`;

const SubText = styled.span`
  font-size: 1.25rem;
  color: ${darkTheme.adaptiveGrey200};
  margin: 0 0 4rem 0;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${darkTheme.adaptiveGrey500};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  width: 16rem;
  height: 2rem;

  &:focus-within {
    outline: 2px solid ${darkTheme.mainBadgeColor};
  }
`;

const MagIcon = styled.i`
  color: ${darkTheme.adaptiveGrey200};
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: 0;
  width: 100%;
  padding-left: 1rem;
  font: inherit;
  font-size: 0.875rem;
  color: ${darkTheme.adaptiveGrey200};

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: ${darkTheme.adaptiveGrey200};
  }
`;

const Switches = styled.div``;

const SwitchItem = styled.button`
  background-color: transparent;
  margin: 0 2rem 0 0;
  padding: 0 0 0.25rem 0;

  span {
    margin-right: ${letterSpacingSize}rem;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Hr = styled.hr`
  border: 1px solid ${darkTheme.adaptiveGrey700};
  background-color: ${darkTheme.adaptiveGrey700};
  width: 100%;
  margin: 0;
`;

const MyFriends = styled.div``;

const Requests = styled.div``;

export default Social;
