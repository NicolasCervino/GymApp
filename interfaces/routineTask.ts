import { Exercise } from "./exercise";
import { ExerciseSet } from "./exerciseSet";

export interface RoutineTask {
  exercise: Exercise;
  sets: ExerciseSet[];
  id: string;
}
