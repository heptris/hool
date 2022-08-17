import { useEffect, useState } from "react";

import styled from "styled-components";
import { darkTheme } from "styles";

import { getMeetingListSearchByCategory } from "api/meeting";

import PageHeader from "components/commons/PageHeader";

import { ConferenceCategoryType } from "types/ConferenceCategoryType";

const MeetingHeader = ({ changeState }: { changeState: Function }) => {
  const [conferenceCategory, setConferenceCategory] =
    useState<ConferenceCategoryType>("DEFAULT");
  const switchStateHandler = (state: ConferenceCategoryType) => {
    setConferenceCategory(state);
    changeState(state);
  };

  useEffect(() => {
    conferenceCategory !== "DEFAULT" &&
      getMeetingListSearchByCategory(conferenceCategory, 10, 10).then((res) =>
        console.log(res)
      ); // 페이지네이션이 안돼서 일단 임의로 붙여놓은 숫자
  }, [conferenceCategory]);

  return (
    <PageHeader
      pageTitle="응원 세션 참가"
      subtext="친구와 함께 좋아하는 팀 경기를 응원하러 가볼까요?"
      isDisplaySearchBar={true}
      isDisplayBtn={false}
      isDisplayInfo={false}
    >
      {
        <MeetingSwitches>
          <SwitchItem
            style={
              conferenceCategory === "DEFAULT"
                ? {
                    background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                  }
                : {}
            }
            onClick={() => {
              switchStateHandler("DEFAULT");
            }}
          >
            <span
              style={
                conferenceCategory === "DEFAULT"
                  ? { color: darkTheme.mainBadgeColor }
                  : {}
              }
            >
              전체
            </span>
          </SwitchItem>
          <SwitchItem
            style={
              conferenceCategory === "SOCCER"
                ? {
                    background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                  }
                : {}
            }
            onClick={() => {
              switchStateHandler("SOCCER");
            }}
          >
            <span
              style={
                conferenceCategory === "SOCCER"
                  ? { color: darkTheme.mainBadgeColor }
                  : {}
              }
            >
              축구
            </span>
          </SwitchItem>
          <SwitchItem
            style={
              conferenceCategory === "BASEBALL"
                ? {
                    background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                  }
                : {}
            }
            onClick={() => {
              switchStateHandler("BASEBALL");
            }}
          >
            <span
              style={
                conferenceCategory === "BASEBALL"
                  ? { color: darkTheme.mainBadgeColor }
                  : {}
              }
            >
              야구
            </span>
          </SwitchItem>
          <SwitchItem
            style={
              conferenceCategory === "BASKETBALL"
                ? {
                    background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                  }
                : {}
            }
            onClick={() => {
              switchStateHandler("BASKETBALL");
            }}
          >
            <span
              style={
                conferenceCategory === "BASKETBALL"
                  ? { color: darkTheme.mainBadgeColor }
                  : {}
              }
            >
              농구
            </span>
          </SwitchItem>
          <SwitchItem
            style={
              conferenceCategory === "VOLLEYBALL"
                ? {
                    background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                  }
                : {}
            }
            onClick={() => {
              switchStateHandler("VOLLEYBALL");
            }}
          >
            <span
              style={
                conferenceCategory === "VOLLEYBALL"
                  ? { color: darkTheme.mainBadgeColor }
                  : {}
              }
            >
              배구
            </span>
          </SwitchItem>
          <SwitchItem
            style={
              conferenceCategory === "ESPORTS"
                ? {
                    background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                  }
                : {}
            }
            onClick={() => {
              switchStateHandler("ESPORTS");
            }}
          >
            <span
              style={
                conferenceCategory === "ESPORTS"
                  ? { color: darkTheme.mainBadgeColor }
                  : {}
              }
            >
              E-sports
            </span>
          </SwitchItem>
        </MeetingSwitches>
      }
    </PageHeader>
  );
};

const MeetingSwitches = styled.div`
  display: flex;
  margin: 0 0 0 0;
`;
const SwitchItem = styled.button`
  background-color: transparent;
  color: ${darkTheme.white};
  margin: 0 2rem 0 0;
  padding: 0 0 0.25rem 0;

  &:hover {
    cursor: pointer;

    span {
      color: ${darkTheme.adaptiveGrey200};
    }
  }
`;
export default MeetingHeader;
