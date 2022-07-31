import styled from "styled-components";

import Button from "components/commons/Button";
import MeetingListItem from "./MeetingListItem";
import Modal from "components/commons/Modal";

const MeetingList = () => {
  return (
    <Wrapper>
      <Container>
        <Header>
          <Button
            height={3}
            width={7}
            marginTop={3}
            marginBottom={3}
            CSSProps={{ float: "right" }}
            text={"응원방 만들기"}
          />
        </Header>
        <ItemList>
          <MeetingListItem />
          <MeetingListItem />
          <MeetingListItem />
          <MeetingListItem />
          <MeetingListItem />
          <MeetingListItem />
          <MeetingListItem />
          <MeetingListItem />
          <MeetingListItem />
        </ItemList>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.section`
  width: 90%;
`;
const Header = styled.header`
  overflow: hidden;
`;
const ItemList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  grid-gap: 2rem;
  padding-top: 5rem;
  justify-content: center;
  margin: auto;
`;
const MeetingListModal = styled(Modal)``;
export default MeetingList;
