import Button from "@/components/Button";
import { Stack } from "expo-router";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AfterAuthLayout = () => {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerShown: true, // Show the header to use the back button
      }}
    >
      {/* Define your screens here */}
    </Stack>
  );
};

export default AfterAuthLayout;
