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

  return { routines, loading };
};

export default useRoutines;
