import { AddExercises } from "@/components/AddExercises";
import withAuth from "@/hocs/withAuth";
import AppLayout from "@/layout/appLayout";

const AddExercisesToNewRoutinePage = () => {
  return (
    <AppLayout>
      <AddExercises />
    </AppLayout>
  );
};

export default withAuth(AddExercisesToNewRoutinePage);
