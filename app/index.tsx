import Loading from "@/components/Loading";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import { verifyToken } from "@/lib/authService";
import auth from "@react-native-firebase/auth"; // Firebase Authentication
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

const Index = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const signOutUser = async () => {
    try {
      await auth().signOut();
      console.log("User signed out!");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const firebaseToken = await user.getIdToken();
          console.log("This is the access token:", firebaseToken);

          const responseData = await verifyToken(firebaseToken);

          if (!responseData?.validToken) {
            throw new Error("Invalid token");
          }

          console.log("User signed in!");
          router.push("/home");
        } catch (error) {
          Alert.alert("Authentication", "Operation was unsuccessful");
          signOutUser();
        }
      } else {
        router.push("/welcome");
      }
      setIsLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, [router]);

  if (isLoading) {
    return (
      <ScreenWrapper>
        <Loading />
      </ScreenWrapper>
    );
  }

  return null;
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 0,
    paddingHorizontal: wp(5),
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: theme.light.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: theme.fonts.extrabold,
  },
});
