import { useState, useEffect } from "react";
import { supabaseClient } from "@/utils/supabaseClient";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/router";
import { UserData } from "@/interfaces/userData";
import { User } from "@supabase/supabase-js";

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  // To get user data
  const getUser = async (): Promise<User | null> => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    return user;
  };

  useEffect(() => {
    // TO UPDATE USER WHEN AUTH EVENT
    const updateUser = async (): Promise<void> => {
      const fetchedUser = await getUser();
      if (fetchedUser) {
        setUserData({ username: fetchedUser.user_metadata.username, email: fetchedUser.email });
      } else {
        setUserData(null);
      }
    };
    // To maintain session
    const checkSession = async () => {
      const session = await supabaseClient.auth.getSession();
      if (session.data.session !== null) {
        setIsAuthenticated(true);
        const fetchedUser = await getUser();
        if (fetchedUser) {
          setUserData({ username: fetchedUser.user_metadata.username, email: fetchedUser.email });
        } else {
          setUserData(null);
        }
        setTimeout(() => {
          router.push("/app");
        }, 0);
      }
    };
    checkSession();
    // Sets listener to auth state change
    const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
      // This also executes everytime you change tabs apparently ._.
      // Not sure if that is actually a problem
      if (event === "SIGNED_IN") {
        setIsAuthenticated(true);
        updateUser();
        setTimeout(() => {
          router.push("/app");
        }, 0);
      } else if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
        updateUser();
        setTimeout(() => {
          router.push("/");
        }, 0);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    }; // eslint-disable-next-line
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData }}>{children}</AuthContext.Provider>;
};
