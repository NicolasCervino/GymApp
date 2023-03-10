import { UserData } from "@/interfaces/userData";
import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";

export const useUser = (): UserData | null => {
  const userContext = useContext(AuthContext);
  return userContext.userData;
};
