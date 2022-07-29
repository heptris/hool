import styled from "styled-components";

import Social from "components/social/Social";

function SocialView() {
  return (
    <Container>
      <Social />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 1rem 0 0 0;
`;

export default SocialView;
