import { AddExercises } from "@/components/AddExercises";
import withAuth from "@/hocs/withAuth";
import AppLayout from "@/layout/appLayout";
import React from "react";

const AddExercisesToWorkoutPage = () => {
  return (
    <AppLayout>
      <AddExercises workoutMode={true} />
    </AppLayout>
  );
};

export default withAuth(AddExercisesToWorkoutPage);
