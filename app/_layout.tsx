import Loading from "@/components/Loading";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import { verifyToken } from "@/lib/authService";
import auth from "@react-native-firebase/auth"; // Firebase Authentication
import { Slot, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import useAuth, { signOutUser } from "@/lib/auth";

const InitialLayout = () => {
  const { isLoading, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === "(auth)";

    console.log("User changed: ", isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace("/home");
    } else if (!isSignedIn) {
      router.replace("/welcome");
    }
  }, [isSignedIn]);

  return <Slot />;
};

const RootLayout = () => {
  return <InitialLayout />;
};

export default RootLayout;
