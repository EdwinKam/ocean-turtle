import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BackButton from "@/components/BackButton";

const ViewPost = () => {
  const router = useRouter();
  const { postId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <BackButton router={router} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Post ID: {postId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    paddingTop: 50, // Add padding to avoid overlap with the back button
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#000",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default ViewPost;
