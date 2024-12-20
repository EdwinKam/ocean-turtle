import auth from "@react-native-firebase/auth"; // Firebase Authentication

import { useState, useEffect } from "react";
import { isAccessTokenValid, verifyToken } from "@/lib/authService";
import { Alert } from "react-native";

const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const isTokenValid = await isAccessTokenValid(user);
        setIsSignedIn(isTokenValid);
      } else {
        setIsSignedIn(false);
      }
      setIsLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, []);

  return { isSignedIn, isLoading };
};

export default useAuth;

export const signOutUser = async () => {
  try {
    await auth().signOut();
    console.log("User signed out!");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};
