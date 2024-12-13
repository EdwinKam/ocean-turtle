import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";

const LoadingPostCard: React.FC = () => {
  const translateX = useRef(new Animated.Value(-wp(20))).current; // Start off-screen to the left

  useEffect(() => {
    const animateWave = () => {
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: wp(80), // Move to the right beyond the placeholder width
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(500), // Pause for 0.5 seconds
        Animated.timing(translateX, {
          toValue: -wp(20), // Reset to start position
          duration: 0, // Instant reset
          useNativeDriver: true,
        }),
      ]).start(() => animateWave()); // Start the sequence again
    };

    animateWave();

    return () => translateX.stopAnimation(); // Clean up animation on unmount
  }, [translateX]);

  return (
    <View style={styles.postContainer}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.textPlaceholder}>
        <Animated.View
          style={[styles.animatedBar, { transform: [{ translateX }] }]}
        >
          <View style={styles.glowBar} />
        </Animated.View>
      </View>
      <View style={styles.textPlaceholder}>
        <Animated.View
          style={[styles.animatedBar, { transform: [{ translateX }] }]}
        >
          <View style={styles.glowBar} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    marginBottom: hp(0.5),
    marginHorizontal: wp(0.5),
    backgroundColor: "#f9fcff",
    borderRadius: wp(3),
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
    height: hp(30),
  },
  imagePlaceholder: {
    width: "100%",
    height: "70%",
    backgroundColor: theme.light.icon,
  },
  textPlaceholder: {
    width: "80%",
    height: hp(2),
    backgroundColor: theme.light.icon,
    marginVertical: hp(0.5),
    marginHorizontal: wp(3),
    borderRadius: wp(1),
    overflow: "hidden",
  },
  animatedBar: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
  },
  glowBar: {
    width: wp(20), // Width of the glowing bar
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white for glow
    borderRadius: wp(1),
    shadowColor: "rgba(255, 255, 255, 0.8)", // Light shadow for glow effect
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10, // Increase for more glow
  },
});

export default LoadingPostCard;
