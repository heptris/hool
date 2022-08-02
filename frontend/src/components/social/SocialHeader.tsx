import styled from "styled-components";
import { darkTheme } from "styles/Theme";
import { letterSpacingSize } from "styles/GlobalStyle";

import PageHeader from "components/commons/PageHeader";

type PropsType = {
  isDisplayMyFriends: boolean;
  setIsDisplayMyFriends: Function;
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
      searchPlaceholder="친구 검색"
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
    ></PageHeader>
  );
}

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

    span {
      color: ${darkTheme.adaptiveGrey200};
    }
  }
`;

export default SocialHeader;
