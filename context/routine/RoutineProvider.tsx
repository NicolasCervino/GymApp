import { Routine } from "@/interfaces/routine";
import { useContext, useState } from "react";
import { RoutineContext } from "./RoutineContext";
import { ExerciseSet } from "@/interfaces/exerciseSet";
import { Exercise } from "@/interfaces/exercise";
import { v4 as uuid } from "uuid";
import { supabaseClient } from "@/utils/supabaseClient";
import { useUser } from "@/hooks/useUser";

interface RoutineProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const RoutineProvider = ({ children }: RoutineProviderProps) => {
  const [newRoutine, setNewRoutine] = useState<Routine | null>(null);
  const userData = useUser();
  const userId = userData ? userData.userId : null;

  // Alows to update a specific task with a new ExerciseSet in the newRoutine state
  const updateTaskSets = (taskId: string, newSets: ExerciseSet[]) => {
    setNewRoutine((prevRoutine) => {
      if (!prevRoutine) return null;

      const taskIndex = prevRoutine.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex < 0) return prevRoutine;

      const updatedTasks = [...prevRoutine.tasks];
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], sets: newSets };

      return { ...prevRoutine, tasks: updatedTasks };
    });
  };

  // Allows to remove a specific task from the newRoutine state
  const removeTask = (taskId: string) => {
    setNewRoutine((prevRoutine) => {
      if (!prevRoutine) return null;

      const updatedTasks = prevRoutine.tasks.filter((task) => task.id !== taskId);

      return { ...prevRoutine, tasks: updatedTasks };
    });
  };

  const updateName = (newName: string) => {
    setNewRoutine((prevRoutine) => {
      if (!prevRoutine) return null;

      return { ...prevRoutine, name: newName };
    });
  };

  // Update the newRoutine with the selected exercises
  const addSelectedExercises = (selectedExercises: Exercise[]) => {
    setNewRoutine((prevNewRoutine: Routine | null) => {
      if (!prevNewRoutine) {
        // In case the Routine is still null
        return {
          id: "routine-" + uuid(),
          name: "",
          tasks: selectedExercises.map((exercise: Exercise) => ({
            exercise,
            sets: [{ reps: 0, kg: 0, setNumber: 1, id: uuid() }],
            id: "task-" + uuid(),
          })),
        };
      } else {
        // The Routine exists so only add new tasks
        return {
          ...prevNewRoutine,
          tasks: [
            ...prevNewRoutine.tasks,
            ...selectedExercises.map((exercise: Exercise) => ({
              exercise,
              sets: [{ reps: 0, kg: 0, setNumber: 1, id: uuid() }],
              id: uuid(),
            })),
          ],
        };
      }
    });
  };

  const saveNewRoutine = async () => {
    if (newRoutine) {
      try {
        const { data, error } = await supabaseClient
          .from("routines")
          .insert({ id: newRoutine.id, name: newRoutine.name, tasks: newRoutine.tasks, userID: userId });
        if (error) {
          throw error;
        }
        return true; // operation was successful
      } catch (error) {
        console.error("Error saving routine", error);
        return false; // operation failed
      }
    }
    return false; // newRoutine is null
  };

  return (
    <RoutineContext.Provider
      value={{ newRoutine, setNewRoutine, updateTaskSets, removeTask, updateName, addSelectedExercises, saveNewRoutine }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutineContext = () => useContext(RoutineContext);
