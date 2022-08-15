import PageHeader from "components/commons/PageHeader";

const MeetingHeader = () => {
  return (
    <PageHeader
      pageTitle="응원 ZONE"
      subtext="친구와 함께 좋아하는 팀 경기를 응원하러 가볼까요?"
      isDisplaySearchBar={false}
      isDisplayBtn={false}
      isDisplayInfo={false}
    />
  );
};

export default MeetingHeader;
