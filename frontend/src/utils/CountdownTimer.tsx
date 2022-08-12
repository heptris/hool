import { useCountdown } from "hooks/useCountdown";
import styled from "styled-components";
import { darkTheme } from "styles";

const { emphasisColor, adaptiveGrey200 } = darkTheme;

const DateTimeDisplay = ({ value }: { value: number }) => {
  return (
    <TimerDisplay>
      <p>{Number(value).toString().padStart(2, "0")}</p>
    </TimerDisplay>
  );
};
const TimerDisplay = styled.div`
  margin: 0 0.3rem;
`;

const ShowCounter = ({
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <>
      <Timer>
        <DateTimeDisplay value={minutes} />
        <Colon> : </Colon>
        <DateTimeDisplay value={seconds} />
      </Timer>
    </>
  );
};
const Timer = styled.div`
  vertical-align: text-top;
  display: flex;
  align-items: center;
`;
const Colon = styled.div``;

const CountdownTimer = ({ leftTime }: { leftTime: number[] }) => {
  const [days, hours, minutes, seconds] = leftTime;

  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

export default CountdownTimer;
