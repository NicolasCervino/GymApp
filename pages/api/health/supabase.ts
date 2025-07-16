import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, error } = await supabaseClient
      .from("workouts")
      .select("count")
      .limit(1);

    if (error) {
      console.error("Supabase health check failed:", error);
      return res.status(500).json({
        status: "error",
        message: "Supabase connection failed",
        error: error.message,
      });
    }

    res.status(200).json({
      status: "healthy",
      message: "Supabase connection successful",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({
      status: "error",
      message: "Unexpected error occurred",
    });
  }
}
