import { useState, useEffect } from 'react';

const Timer = ({ isGameStart, isGameEnd }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isGameStart && !isGameEnd) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (isGameEnd) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isGameStart, isGameEnd]);

  return (
    <div>
      <h1 id="timer">
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}</span>:
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>:
        <span>{('0' + Math.floor((time / 10) % 100)).slice(-2)}</span>
      </h1>
    </div>
  );
};

export default Timer;
