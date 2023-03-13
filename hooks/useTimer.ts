import { useWorkoutContext } from "@/context/workout/WorkoutProvider";
import { useState, useEffect } from "react";

const useTimer = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);

  const { currentWorkout } = useWorkoutContext();

  // Get start time from local storage on mount
  useEffect(() => {
    const storedStartTime = localStorage.getItem("startTime");
    if (storedStartTime) {
      setStartTime(parseInt(storedStartTime));
    }
  }, [currentWorkout]);

  // Update totalSeconds every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (startTime) {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        setTotalSeconds(elapsedSeconds);
      }
    }, 1000);

    // Save start time to local storage on unmount
    return () => {
      clearInterval(intervalId);
      // Store start time in local storage
    };
  }, [startTime]);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { seconds, minutes, hours, totalSeconds };
};

export default useTimer;
