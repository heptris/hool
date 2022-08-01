import styled from "styled-components";

import Profile from "components/accounts/Profile";
import Inventory from "components/accounts/Inventory";
import { Layout } from "components/layouts/Layout";

function ProfilePage() {
  return (
    <Layout>
      <Container>
        <Profile />
        <Inventory />
      </Container>
    </Layout>
  );
}

const Row = styled.div`
  width: 83.333333%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 1rem 0 0 0;
`;

export default ProfilePage;
