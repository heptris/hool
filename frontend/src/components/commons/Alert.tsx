import { useState, useEffect } from "react";

import "animate.css";
import styled from "styled-components";
import { darkTheme } from "styles";

type PropsType = {
  isDisplayAlert: boolean;
  handleDisplayAlert: Function;
  displayTimeInMs: number;
  msgToDisplay: string;
  isSuccess?: boolean;
};

function Alert(props: PropsType) {
  const {
    isDisplayAlert,
    handleDisplayAlert,
    displayTimeInMs,
    isSuccess,
    msgToDisplay,
  } = props;
  useEffect(() => {
    if (isDisplayAlert === false) return;

    setTimeout(() => handleDisplayAlert(false), displayTimeInMs);
  }, [isDisplayAlert]);

  const [leftTime, setLeftTime] = useState(displayTimeInMs);
  // useEffect(() => {
  //   if (leftTime < 0) return;

  //   setLeftTime(leftTime - 0.5);
  // }, [leftTime]);

  return (
    <Wrapper>
      <AlertBox className="animate__animated animate__bounceInDown">
        {isSuccess !== undefined && isSuccess ? (
          <Icon isSuccess={isSuccess} className="fa-solid fa-circle-check" />
        ) : (
          <Icon isSuccess={isSuccess!} className="fa-solid fa-circle-xmark" />
        )}
        {msgToDisplay}
        <TimeProgress
          isSuccess={isSuccess!}
          value={leftTime}
          max={displayTimeInMs}
        />
      </AlertBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-size: cover;
  position: fixed;
  top: 8vh;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9750;
`;
const AlertBox = styled.div`
  position: fixed;
  width: 30vw;
  height: 4rem;
  background-color: ${darkTheme.bgColor};
  border-radius: 4px;
  padding: 0 1rem;
  display: flex;
  justify-content: start;
  align-items: center;

  font-size: 1.1rem;
  font-weight: bold;

  box-sizing: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const Icon = styled.i`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: ${({ isSuccess }: { isSuccess: boolean }) =>
    isSuccess ? darkTheme.infoColor : darkTheme.contrastColor};
`;
const TimeProgress = styled.progress`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.3rem;
  border: 0;

  ::-webkit-progress-bar {
    background-color: ${darkTheme.bgColor};
  }
  ::-webkit-progress-value {
    background-color: ${({ isSuccess }: { isSuccess: boolean }) =>
      isSuccess ? darkTheme.infoColor : darkTheme.contrastColor};
  }
`;

export default Alert;
