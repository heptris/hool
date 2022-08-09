import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`;
const Spinner = styled.div`
  width: 10rem;
  height: 10rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #383636; /* Black */
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  box-sizing: border-box;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Loading;
