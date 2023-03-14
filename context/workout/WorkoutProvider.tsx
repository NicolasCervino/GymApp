import { useContext, useState } from "react";
import { Workout } from "@/interfaces/workout";
import { WorkoutContext } from "./WorkoutContext";
import { v4 as uuid } from "uuid";
import { RoutineTask } from "@/interfaces/routineTask";
import { ExerciseSet } from "@/interfaces/exerciseSet";
import { Exercise } from "@/interfaces/exercise";
import { supabaseClient } from "@/utils/supabaseClient";
import { useUser } from "@/hooks/useUser";
import fetchWorkoutPhoto from "@/utils/fetchWorkoutPhoto";

interface WorkoutProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const WorkoutProvider = ({ children }: WorkoutProviderProps) => {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const userData = useUser();
  const userId = userData ? userData.userId : null;

  const createNewWorkout = (name: string, tasks: RoutineTask[], startTime: number) => {
    if (!currentWorkout) {
      const newWorkout: Workout = { id: uuid(), duration: 0, name: name, tasks: tasks, startTime: startTime };
      localStorage.setItem("startTime", startTime.toString());
      setCurrentWorkout(newWorkout);
    }
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

  const addExercisesToWorkout = (exercises: Exercise[]) => {
    const newTasks: RoutineTask[] = exercises.map((exercise) => ({
      exercise,
      sets: [{ reps: 0, kg: 0, setNumber: 1, id: uuid(), completed: false }],
      id: uuid(),
    }));

    setCurrentWorkout((prevWorkout) => {
      if (!prevWorkout) return null;

      return {
        ...prevWorkout,
        tasks: [...prevWorkout.tasks, ...newTasks],
      };
    });
  };

  // Returns only tasks with completed sets and removes uncompleted sets from all tasks
  const removeUncompletedSetsFromTasks = () => {
    const tasks = currentWorkout?.tasks
      .map((task) => {
        const completedSets = task.sets.filter((set) => set.completed === true);
        return { ...task, sets: completedSets };
      })
      .filter((task) => task.sets.length > 0);
    return tasks;
  };

  const saveWorkout = async () => {
    if (currentWorkout) {
      try {
        const photoUrl = await fetchWorkoutPhoto();
        const duration = Date.now() - currentWorkout.startTime;
        const { error } = await supabaseClient.from("workouts").insert({
          id: currentWorkout.id,
          name: currentWorkout.name,
          tasks: removeUncompletedSetsFromTasks(),
          duration: duration,
          userID: userId,
          image_url: photoUrl,
        });
        if (error) {
          throw error;
        }
        return true; // operation was successful
      } catch (error) {
        console.error("Error saving workout", error);
        return false; // operation failed
      }
    }
    return false; // currentWorkout is null
  };

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        setCurrentWorkout,
        createNewWorkout,
        updateWorkoutTasks,
        removeWorkoutTask,
        addExercisesToWorkout,
        saveWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => useContext(WorkoutContext);
