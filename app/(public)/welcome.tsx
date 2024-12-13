import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Welcome Image */}
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require("../../assets/images/welcome.png")}
        />

        {/* Title */}
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>Ocean</Text>
          <Text style={styles.punchline}>Immerse in a Ocean full of fun</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => {
              router.push("/signup");
            }}
            textStyle={undefined}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Pressable
              onPress={() => {
                router.push("/signin");
              }}
            >
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.light.tabIconSelected,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: wp(4),
  },

  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf: "center",
  },

  title: {
    color: theme.light.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: theme.fonts.extrabold,
  },

  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.light.text,
  },

  footer: {
    gap: 30,
    width: "100%",
  },

  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  loginText: {
    textAlign: "center",
    color: theme.light.text,
    fontSize: hp(1.6),
  },
});
