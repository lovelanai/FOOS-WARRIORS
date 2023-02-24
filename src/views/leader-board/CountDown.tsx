import React, { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;

  const difference = +new Date(`${nextYear}-${nextMonth + 1}-1`) - +now;
  let timeLeft: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);

  return (
    <div className="countDown">
      {Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval as keyof TimeLeft]) {
          return;
        }
        return (
          <div key={interval} className="holder">
            <span>
              <p
                className="number"
                style={{ fontSize: "4rem", margin: "0rem" }}
              >
                {timeLeft[interval as keyof TimeLeft]}
              </p>
              <p
                className="entity"
                style={{ fontSize: "2rem", margin: "0rem" }}
              >
                {interval}
              </p>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Countdown;
