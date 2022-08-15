import { useMutation } from "@tanstack/react-query";
import { getMeetingListSearchByCategory } from "api/meeting";
import PageHeader from "components/commons/PageHeader";
import { ChangeEvent, useEffect, useState } from "react";
import { ConferenceCategoryType } from "types/ConferenceCategoryType";
import SelectCategory from "../common/SelectCategory";
import { darkTheme } from "styles";
import styled from "styled-components";

const MeetingHeader = ({ changeState, isState, changeSport }) => {
  const [conferenceCategory, setConferenceCategory] =
    useState<ConferenceCategoryType>("DEFAULT");
  const switchStateHandler = (state: boolean) => {
    if (state) {
      changeState(true); //전체
    } else {
      changeState(false); //최신순
    }
  };
  const switchSportHandler = (sport: string) => {
    changeSport(sport);
  };

  const onChange = (
    key: "conferenceCategory",
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setConferenceCategory(value);
    switchSportHandler(value);
  };
  useEffect(() => {
    conferenceCategory !== "DEFAULT" &&
      getMeetingListSearchByCategory(conferenceCategory, 10, 10).then((res) =>
        console.log(res)
      ); // 페이지네이션이 안돼서 일단 임의로 붙여놓은 숫자
  }, [conferenceCategory]);

  return (
    <PageHeader
      pageTitle="응원 ZONE"
      subtext="친구와 함께 좋아하는 팀 경기를 응원하러 가볼까요?"
      isDisplaySearchBar={true}
      isDisplayBtn={false}
      isDisplayInfo={false}
      SearchBar={
        <div>
          <SelectCategory
            conferenceCategory={conferenceCategory}
            onChange={onChange}
          />
        </div>
      }
    >
      {
        <MeetingSwitches>
          <SwitchItem
            style={
              isState
                ? {
                    background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                  }
                : {}
            }
            onClick={() => {
              switchStateHandler(true);
            }}
          >
            <span style={isState ? { color: darkTheme.mainBadgeColor } : {}}>
              전 체
            </span>
          </SwitchItem>
          <SwitchItem
            style={
              isState
                ? {}
                : {
                    background: `linear-gradient(to bottom, transparent 85%, ${darkTheme.mainBadgeColor} 15%)`,
                  }
            }
            onClick={() => {
              switchStateHandler(false);
            }}
          >
            <span style={isState ? {} : { color: darkTheme.mainBadgeColor }}>
              최신순
            </span>
          </SwitchItem>
        </MeetingSwitches>
      }
    </PageHeader>
  );
};

const MeetingSwitches = styled.div`
  display: flex;
  margin: 0 0 0 0.8rem;
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
