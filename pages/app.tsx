import withAuth from "@/hocs/withAuth";
import SearchBar from "@/components/SearchBar";
import AppLayout from "@/layout/appLayout";
import useWorkouts from "@/hooks/useWorkouts";
import { useEffect, useState } from "react";
import { Workout } from "@/interfaces/workout";
import LatestWorkout from "@/components/LatestWorkout";
import AllWorkouts from "@/components/AllWorkouts";

const App = () => {
  const { workouts, loading } = useWorkouts();
  const [latestWorkout, setLatestWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    // Get todays workouts
    const todayWorkouts = workouts.filter((workout) => {
      const workoutDate = new Date(workout.created_at!);
      const today = new Date();
      return (
        workoutDate.getDate() === today.getDate() &&
        workoutDate.getMonth() === today.getMonth() &&
        workoutDate.getFullYear() === today.getFullYear()
      );
    });
    if (workouts.length > 0 && todayWorkouts.length > 0 && !loading) {
      setLatestWorkout(todayWorkouts[0]);
    }
  }, [workouts, loading]);

  return (
    <AppLayout>
      <div className="md:ml-28 h-[85vh] md:h-[92vh] overflow-x-hidden text-white">
        <SearchBar />
        <LatestWorkout workout={latestWorkout} />
        <AllWorkouts workouts={workouts} />
        <div></div>
      </div>
    </AppLayout>
  );
};

export default withAuth(App);
