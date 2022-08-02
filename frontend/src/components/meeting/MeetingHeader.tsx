import PageHeader from "components/commons/PageHeader";

const MeetingHeader = () => {
  return (
    <PageHeader
      pageTitle="응원방 리스트"
      subtext="같이 응원해요"
      isDisplaySearchBar={false}
      isDisplayBtn={false}
      isDisplayInfo={false}
    />
  );
};

export default MeetingHeader;
