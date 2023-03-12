import { useState, useEffect } from "react";

const useTimer = (startTime: number) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(Math.floor((Date.now() - startTime) / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { seconds, minutes, hours, totalSeconds };
};

export default useTimer;
