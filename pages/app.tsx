import withAuth from "@/hocs/withAuth";
import SearchBar from "@/components/SearchBar";
import AppLayout from "@/layout/appLayout";
import useWorkouts from "@/hooks/useWorkouts";
import { useEffect, useState } from "react";
import { Workout } from "@/interfaces/workout";
import LatestWorkout from "@/components/LatestWorkout";
import AllWorkouts from "@/components/AllWorkouts";
import SearchResultWorkouts from "@/components/SearchResultWorkouts";

const App = () => {
  const { workouts, loading } = useWorkouts();
  const [latestWorkout, setLatestWorkout] = useState<Workout | null>(null);
  const [searchResults, setSearchResults] = useState<Workout[]>([]);
  const [searchMode, setSearchMode] = useState<boolean>(false);

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

  // Search workouts by name
  const handleSearch = (query: string) => {
    if (query.trim() !== "") {
      const filteredWorkouts = workouts.filter((workout) => workout.name.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(filteredWorkouts);
      setSearchMode(true);
    }
    if (query.trim() === "" && searchMode) {
      setSearchResults([]);
      setSearchMode(false);
    }
  };

  return (
    <AppLayout>
      <div className="md:ml-28 h-[85vh] md:h-[92vh] overflow-x-hidden text-white">
        <SearchBar onSearch={handleSearch} workouts={true} />
        <LatestWorkout workout={latestWorkout} />
        {!searchMode ? (
          <AllWorkouts workouts={workouts} />
        ) : (
          <SearchResultWorkouts workouts={searchResults} setSearchMode={setSearchMode} />
        )}
      </div>
    </AppLayout>
  );
};

export default withAuth(App);
