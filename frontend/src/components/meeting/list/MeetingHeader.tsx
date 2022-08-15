import { useMutation } from "@tanstack/react-query";
import { getMeetingListSearchByCategory } from "api/meeting";
import PageHeader from "components/commons/PageHeader";
import { ChangeEvent, useEffect, useState } from "react";
import { ConferenceCategoryType } from "types/ConferenceCategoryType";
import SelectCategory from "../common/SelectCategory";

const MeetingHeader = () => {
  const [conferenceCategory, setConferenceCategory] =
    useState<ConferenceCategoryType>("DEFAULT");

  const onChange = (
    key: "conferenceCategory",
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setConferenceCategory(value);
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
    />
  );
};

export default MeetingHeader;
