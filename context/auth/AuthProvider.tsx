import { useState, useEffect } from "react";
import { supabaseClient } from "@/utils/supabaseClient";
import { UserData } from "@/interfaces/userData";
import { AuthChangeEvent, User } from "@supabase/supabase-js";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUser = async (): Promise<User | null> => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    return user;
  };

  // TO UPDATE USER WHEN AUTH EVENT
  const updateUser = async (): Promise<void> => {
    const fetchedUser = await getUser();
    if (fetchedUser) {
      setUserData({
        username: fetchedUser.user_metadata.custom_name || fetchedUser.user_metadata.name,
        email: fetchedUser.email,
        image: fetchedUser.user_metadata.custom_avatar || fetchedUser.user_metadata.avatar_url,
        userId: fetchedUser.id,
      });
    } else {
      setUserData(null);
    }
  };

  // Runs on auth event
  const handleAuthChange = async (event: AuthChangeEvent) => {
    if (event === "SIGNED_IN") {
      setIsAuthenticated(true);
      await updateUser();
    } else if (event === "SIGNED_OUT") {
      setIsAuthenticated(false);
      updateUser();
    }
    if (event === "USER_UPDATED") {
      await updateUser();
    }
  };

  useEffect(() => {
    // To maintain session
    const checkSession = async () => {
      const session = await supabaseClient.auth.getSession();
      if (session.data.session !== null) {
        setIsAuthenticated(true);
        const fetchedUser = await getUser();
        if (fetchedUser) {
          setUserData({
            username: fetchedUser.user_metadata.custom_name || fetchedUser.user_metadata.name,
            email: fetchedUser.email,
            image: fetchedUser.user_metadata.custom_avatar || fetchedUser.user_metadata.avatar_url,
            userId: fetchedUser.id,
          });
        } else {
          setUserData(null);
        }
      }
    };
    checkSession();
    // Sets listener to auth state change
    const { data } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      handleAuthChange(event);
    });
    return () => {
      data.subscription.unsubscribe();
    }; // eslint-disable-next-line
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData }}>{children}</AuthContext.Provider>;
};
