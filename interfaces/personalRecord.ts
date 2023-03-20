import { ExerciseSet } from "./exerciseSet";

export interface PersonalRecord {
  userId: string;
  exerciseId: string;
  highest_weight: number;
  one_rep_max: number;
  best_set_volume: ExerciseSet;
}
