import { useCountdown } from "hooks/useCountdown";
import styled from "styled-components";
import { darkTheme } from "styles";

const { emphasisColor, adaptiveGrey200 } = darkTheme;

const DateTimeDisplay = ({
  value,
  type,
  isDanger,
}: {
  value: number;
  type: string;
  isDanger: boolean;
}) => {
  return (
    <TimerDisplay>
      <p>{value}</p>
      {/* <span>{type}</span> */}
    </TimerDisplay>
  );
};
const TimerDisplay = styled.div`
  margin: 0 0.3rem;
`;

const ExpiredNotice = () => {
  return (
    <div>
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({
  days,
  hours,
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
      {/* <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
      <p>:</p> */}
      <Timer>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        <Colon> : </Colon>
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
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

const CountdownTimer = ({
  targetDate,
}: {
  targetDate: string | number | Date;
}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
