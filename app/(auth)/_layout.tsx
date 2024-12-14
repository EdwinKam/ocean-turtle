import Button from "@/components/Button";
import { Stack } from "expo-router";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AfterAuthLayout = () => {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Define your screens here */}
    </Stack>
  );
};

export default AfterAuthLayout;
