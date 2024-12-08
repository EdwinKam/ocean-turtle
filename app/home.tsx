import ScreenWrapper from "@/components/ScreenWrapper";
import SignOutButton from "@/components/SignOutButton";
import TabBar from "@/components/TabBar";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Recommendation from "./recommendation";

const Home = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SignOutButton router={router} />
        <Text style={styles.title}>Trend</Text>
        <Recommendation />
      </View>
      <TabBar router={router} />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 0,
    paddingHorizontal: wp(5),
  },

  title: {
    color: theme.light.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: theme.fonts.extrabold,
  },
});
