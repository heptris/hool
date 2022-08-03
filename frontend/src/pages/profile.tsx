import styled from "styled-components";

import Container from "components/commons/Container";
import Profile from "components/accounts/Profile";
import Inventory from "components/accounts/Inventory";

function ProfilePage() {
  return (
    <ConcreteContainer>
      <Profile />
      <Inventory />
    </ConcreteContainer>
  );
}

const ConcreteContainer = styled(Container)`
  flex-direction: row;
  justify-content: center;
  align-items: start;
`;

export default ProfilePage;
