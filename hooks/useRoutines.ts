import { Routine } from "@/interfaces/routine";
import { supabaseClient } from "@/utils/supabaseClient";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";

const useRoutines = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userData = useUser();
  const userId = userData ? userData.userId : null;

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        setLoading(true);
        const { data: routines, error } = await supabaseClient.from("routines").select("*").eq("userID", userId);
        if (error) {
          throw error;
        }
        setRoutines(routines ?? []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching routines", error);
        setLoading(false);
      }
    };

    fetchRoutines();
  }, [userId]);

  const removeRoutine = async (routineId: string) => {
    try {
      const { error } = await supabaseClient.from("routines").delete().eq("id", routineId);
      if (error) {
        throw error;
      }
      setRoutines(routines.filter((routine) => routine.id !== routineId));
      return true; // operation was successful
    } catch (error) {
      console.error("Error deleting routine", error);
      return false; // operation failed
    }
  };

  return { routines, loading, removeRoutine };
};

export default useRoutines;
