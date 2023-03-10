import { useContext, useState } from "react";
import { Workout } from "@/interfaces/workout";
import { WorkoutContext } from "./WorkoutContext";
import { v4 as uuid } from "uuid";
import { RoutineTask } from "@/interfaces/routineTask";
import { ExerciseSet } from "@/interfaces/exerciseSet";

interface WorkoutProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const WorkoutProvider = ({ children }: WorkoutProviderProps) => {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);

  const createNewWorkout = (name: string, tasks: RoutineTask[]) => {
    const newWorkout: Workout = { id: uuid(), duration: 0, name: name, tasks: tasks };
    setCurrentWorkout(newWorkout);
  };

  const updateWorkoutTasks = (taskId: string, newSets: ExerciseSet[]) => {
    setCurrentWorkout((prevWorkout) => {
      if (!prevWorkout) return null;

      const taskIndex = prevWorkout.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex < 0) return prevWorkout;

      const updatedTasks = [...prevWorkout.tasks];
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], sets: newSets };

      return { ...prevWorkout, tasks: updatedTasks };
    });
  };

  const removeWorkoutTask = (taskId: string) => {
    setCurrentWorkout((prevWorkout) => {
      if (!prevWorkout) return null;

      const updatedTasks = prevWorkout.tasks.filter((task) => task.id !== taskId);

      return { ...prevWorkout, tasks: updatedTasks };
    });
  };

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        setCurrentWorkout,
        createNewWorkout,
        updateWorkoutTasks,
        removeWorkoutTask,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => useContext(WorkoutContext);
