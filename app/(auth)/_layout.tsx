import React from "react";
import { Tabs } from "expo-router";
import { Pressable } from "react-native";
import useAuth, { signOutUser } from "@/lib/auth";
import { theme } from "@/constants/theme";
import Icon from "@/assets/icons";

export const LogoutButton = () => {
  const doLogout = () => {
    signOutUser();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Icon name="log-out" size={24} color={"#fff"} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} strokeWidth={2.5} />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="post"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="addSquare"
              size={size}
              color={color}
              strokeWidth={2.5}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="profile" size={size} color={color} strokeWidth={2.5} />
          ),
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
