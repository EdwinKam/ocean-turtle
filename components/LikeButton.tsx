import React, { useRef } from "react";
import Icon from "@/assets/icons";
import { theme } from "@/constants/theme";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from "react-native";

type LikeButtonProps = {
  size?: number;
  likes: number;
  isLiked?: boolean;
  onPress: () => void;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  size = 26,
  likes = 0,
  isLiked = false,
  onPress,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Start the scale animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    // Call the onPress function passed as a prop
    onPress();
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <Animated.View
        style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
      >
        <Icon
          name="heart"
          strokeWidth={2.5}
          size={size}
          color={isLiked ? "red" : "#808080"}
          fill={isLiked ? "red" : "transparent"}
        />
        <Text style={styles.likeCount}>{likes === -1 ? "" : likes}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default LikeButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    padding: 5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  likeCount: {
    fontSize: 14,
    color: "#808080",
    fontWeight: "500",
  },
});
