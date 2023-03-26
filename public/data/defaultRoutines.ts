import { Routine } from "@/interfaces/routine";
import { v4 as uuid } from "uuid";
import { exercisesData } from "./exercises";

export const defaultRoutines: Routine[] = [
  {
    id: "routine-default-1",
    name: "Chest Shoulders and Triceps",
    tasks: [
      {
        // Barbell Bench Press
        exercise: exercisesData.find((exercise) => exercise.id === "0025")!,
        sets: [
          {
            kg: 20,
            reps: 12,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 20,
            reps: 12,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 20,
            reps: 12,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
          {
            kg: 20,
            reps: 12,
            setNumber: 4,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Dumbbell Seated Shoulder Press
        exercise: exercisesData.find((exercise) => exercise.id === "0405")!,
        sets: [
          {
            kg: 8,
            reps: 10,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 8,
            reps: 10,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 8,
            reps: 10,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
          {
            kg: 8,
            reps: 10,
            setNumber: 4,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Dumbbell One Arm Triceps Extension (on bench)
        exercise: exercisesData.find((exercise) => exercise.id === "0362")!,
        sets: [
          {
            kg: 5,
            reps: 10,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 5,
            reps: 10,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 5,
            reps: 10,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Dumbbell Incline Bench Press
        exercise: exercisesData.find((exercise) => exercise.id === "0314")!,
        sets: [
          {
            kg: 10,
            reps: 12,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 10,
            reps: 12,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 10,
            reps: 12,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
          {
            kg: 10,
            reps: 12,
            setNumber: 4,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Dumbbell Lateral Raise
        exercise: exercisesData.find((exercise) => exercise.id === "0334")!,
        sets: [
          {
            kg: 6,
            reps: 12,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 6,
            reps: 12,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 6,
            reps: 12,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Cable Pushdown (with rope attachment)
        exercise: exercisesData.find((exercise) => exercise.id === "0200")!,
        sets: [
          {
            kg: 15,
            reps: 12,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 15,
            reps: 12,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 15,
            reps: 12,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
    ],
  },
  {
    id: "routine-default-2",
    name: "Back and Biceps",
    tasks: [
      {
        // Cable Seated Row
        exercise: exercisesData.find((exercise) => exercise.id === "0861")!,
        sets: [
          {
            kg: 30,
            reps: 15,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 35,
            reps: 12,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 40,
            reps: 10,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
          {
            kg: 45,
            reps: 8,
            setNumber: 4,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Cable Pulldown
        exercise: exercisesData.find((exercise) => exercise.id === "0198")!,
        sets: [
          {
            kg: 20,
            reps: 15,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 25,
            reps: 12,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 30,
            reps: 10,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
          {
            kg: 35,
            reps: 8,
            setNumber: 4,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Cable Curl
        exercise: exercisesData.find((exercise) => exercise.id === "0868")!,
        sets: [
          {
            kg: 25,
            reps: 10,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 25,
            reps: 10,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 25,
            reps: 10,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Dumbbell Hammer Curl
        exercise: exercisesData.find((exercise) => exercise.id === "0313")!,
        sets: [
          {
            kg: 8,
            reps: 12,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 8,
            reps: 12,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 8,
            reps: 12,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
          {
            kg: 8,
            reps: 12,
            setNumber: 4,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Dumbbell One Arm Bent-over Row
        exercise: exercisesData.find((exercise) => exercise.id === "0292")!,
        sets: [
          {
            kg: 10,
            reps: 12,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 10,
            reps: 12,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 10,
            reps: 12,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
          {
            kg: 10,
            reps: 12,
            setNumber: 4,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Chin-up
        exercise: exercisesData.find((exercise) => exercise.id === "1326")!,
        sets: [
          {
            kg: 0,
            reps: 10,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 0,
            reps: 10,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 0,
            reps: 10,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
    ],
  },
  {
    id: "routine-default-3",
    name: "Legs and Abs",
    tasks: [
      {
        // Barbell Full Squat
        exercise: exercisesData.find((exercise) => exercise.id === "0043")!,
        sets: [
          {
            kg: 40,
            reps: 10,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 40,
            reps: 10,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 50,
            reps: 8,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
          {
            kg: 50,
            reps: 8,
            setNumber: 4,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Barbell Deadlift
        exercise: exercisesData.find((exercise) => exercise.id === "0032")!,
        sets: [
          {
            kg: 40,
            reps: 8,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 40,
            reps: 8,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 40,
            reps: 8,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
          {
            kg: 40,
            reps: 8,
            setNumber: 4,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Lever Leg Extension
        exercise: exercisesData.find((exercise) => exercise.id === "0585")!,
        sets: [
          {
            kg: 10,
            reps: 15,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 15,
            reps: 12,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 20,
            reps: 10,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
          {
            kg: 25,
            reps: 8,
            setNumber: 4,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Crunch Floor
        exercise: exercisesData.find((exercise) => exercise.id === "0274")!,
        sets: [
          {
            kg: 0,
            reps: 12,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 0,
            reps: 10,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 0,
            reps: 8,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
      {
        // Cross Body Crunch
        exercise: exercisesData.find((exercise) => exercise.id === "0262")!,
        sets: [
          {
            kg: 0,
            reps: 12,
            setNumber: 1,
            id: uuid(),
            completed: false,
          },
          {
            kg: 0,
            reps: 10,
            setNumber: 2,
            id: uuid(),
            completed: false,
          },
          {
            kg: 0,
            reps: 8,
            setNumber: 3,
            id: uuid(),
            completed: false,
          },
        ],
        id: "task-" + uuid(),
      },
    ],
  },
];
