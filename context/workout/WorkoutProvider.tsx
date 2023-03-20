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
import { PersonalRecord } from "@/interfaces/personalRecord";

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
  // Its expected that the current workout has at least one task
  const removeUncompletedSetsFromTasks = () => {
    const tasks = currentWorkout!.tasks
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
        const completedTasks = removeUncompletedSetsFromTasks();
        const { error } = await supabaseClient.from("workouts").insert({
          id: currentWorkout.id,
          name: currentWorkout.name,
          tasks: completedTasks,
          duration: duration,
          userID: userId,
          image_url: photoUrl,
        });
        if (error) {
          throw error;
        }
        await updateRecords(completedTasks);
        return true; // operation was successful
      } catch (error) {
        console.error("Error saving workout", error);
        return false; // operation failed
      }
    }
    return false; // currentWorkout is null
  };

  // Given an array of sets from an exercise, returns the heaviest weight, calculates the 1RM and the set with highest volume
  const setWithHighestWeightAndReps = (sets: ExerciseSet[]) => {
    let highestWeightSet = sets[0];
    let highestVolumeSet = sets[0];
    let highestVolume = highestVolumeSet.kg * highestVolumeSet.reps;

    for (const set of sets) {
      const volume = set.kg * set.reps;
      if (volume > highestVolume) {
        highestVolumeSet = set;
        highestVolume = volume;
      }
      if (set.kg > highestWeightSet.kg) {
        highestWeightSet = set;
      }
    }

    const weight = highestWeightSet.kg;
    const reps = highestWeightSet.reps;

    if (reps === 1) {
      return { weight, one_rep_max: weight, best_set_volume: highestVolumeSet };
    }

    const one_rep_max = Math.round(weight * reps * 0.0333 + weight);
    return { weight, one_rep_max, best_set_volume: highestVolumeSet };
  };

  // Updates the personal_records table based on the completed tasks from the workout
  const updateRecords = async (tasks: RoutineTask[]) => {
    try {
      const { data: existingRecords, error: fetchError } = await supabaseClient.from("personal_records").select("*").eq("user_id", userId);
      if (fetchError) {
        throw fetchError;
      }

      // An array with the exerciseID of each task and its max weight and 1RM on the currentWorkout
      const tasksWithExerciseIdAndMaxWeight = tasks.map((task) => {
        const { weight, best_set_volume, one_rep_max } = setWithHighestWeightAndReps(task.sets);
        return { id: task.exercise.id, max_weight: weight, one_rep_max, best_set_volume };
      });

      // An array with the exerciseID of each task and its max weight and 1RM on the personal_records from database
      const storedRecords = existingRecords.map((record) => ({
        id: record.exercise_id,
        max_weight: record.highest_weight,
        one_rep_max: record.one_rep_max,
        best_set_volume: record.best_set_volume,
      }));

      // Create an array of new records that need to be inserted
      const newRecords = tasksWithExerciseIdAndMaxWeight
        .filter((task) => !storedRecords.some((record) => record.id === task.id))
        .map((task) => ({
          user_id: userId,
          exercise_id: task.id,
          highest_weight: task.max_weight,
          one_rep_max: task.one_rep_max,
          best_set_volume: task.best_set_volume,
        }));

      // Create an array of existing records that need to be updated
      const existingRecordsToUpdate = tasksWithExerciseIdAndMaxWeight
        .filter((task) =>
          storedRecords.some(
            (record) => record.id === task.id && (record.max_weight < task.max_weight || record.one_rep_max < task.one_rep_max)
          )
        )
        .map((task) => {
          const matchingRecord = storedRecords.find((record) => record.id === task.id);
          const maxWeight = matchingRecord ? Math.max(matchingRecord.max_weight, task.max_weight) : task.max_weight;
          const oneRepMax = matchingRecord ? Math.max(matchingRecord.one_rep_max, task.one_rep_max) : task.one_rep_max;
          return {
            user_id: userId,
            exercise_id: task.id,
            highest_weight: maxWeight,
            one_rep_max: oneRepMax,
            best_set_volume: task.best_set_volume,
          };
        });

      // Perform an upsert query for the new records
      if (newRecords.length > 0) {
        await supabaseClient.from("personal_records").upsert(newRecords);
      }

      // Perform an upsert query for the existing records
      if (existingRecordsToUpdate.length > 0) {
        await supabaseClient.from("personal_records").upsert(existingRecordsToUpdate);
      }
    } catch (error) {
      console.log(error);
    }
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
