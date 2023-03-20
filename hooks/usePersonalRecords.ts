import { PersonalRecord } from "@/interfaces/personalRecord";
import { supabaseClient } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

const usePersonalRecords = (exerciseId: string | string[] | undefined) => {
  const [personalRecord, setPersonalRecord] = useState<PersonalRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const userData = useUser();
  const userId = userData ? userData.userId : null;

  useEffect(() => {
    if (!exerciseId || !userId) {
      return;
    }
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabaseClient
          .from("personal_records")
          .select("*")
          .eq("user_id", userId)
          .eq("exercise_id", exerciseId)
          .limit(1);
        if (error) {
          throw error;
        }
        if (data) {
          setPersonalRecord(data[0]);
        } else {
          setPersonalRecord(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching records", error);
        setLoading(false);
      }
    };

    fetchRecords();
  }, [userId, exerciseId]);

  return { personalRecord, loading };
};

export default usePersonalRecords;
