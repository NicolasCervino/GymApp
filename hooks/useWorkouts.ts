import { Workout } from "@/interfaces/workout";
import { supabaseClient } from "@/utils/supabaseClient";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";

const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userData = useUser();
  const userId = userData ? userData.userId : null;

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (userId) {
        try {
          setLoading(true);
          const { data: workouts, error } = await supabaseClient
            .from("workouts")
            .select("*")
            .eq("userID", userId)
            .order("created_at", { ascending: false });
          if (error) {
            throw error;
          }
          setWorkouts(workouts ?? []);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching workouts", error);
          setLoading(false);
        }
      }
    };

    fetchWorkouts();
  }, [userId]);

  return { workouts, loading };
};

export default useWorkouts;
