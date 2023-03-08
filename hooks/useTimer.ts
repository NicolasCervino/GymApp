import { useState, useEffect } from "react";

const useTimer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((prevMinutes) => prevMinutes + 1);
      setSeconds(0);
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes === 60) {
      setHours((prevHours) => prevHours + 1);
      setMinutes(0);
    }
  }, [minutes]);

  useEffect(() => {
    setTotalSeconds(hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds]);

  return { seconds, minutes, hours, totalSeconds };
};

export default useTimer;
