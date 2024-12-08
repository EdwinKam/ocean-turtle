import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import { Post } from "@/model/post";

// Create some dummy posts
const dummyPosts: Post[] = [
  { content: "Exploring the beauty of nature", author: "Alice" },
  { content: "The future of technology", author: "Bob" },
  { content: "Healthy living tips", author: "Charlie" },
  { content: "Traveling the world on a budget", author: "Diana" },
  { content: "Mastering the art of cooking", author: "Eve" },
];

const Recommendation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommendations</Text>
      <FlatList
        data={dummyPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postContent}>{item.content}</Text>
            <Text style={styles.postAuthor}>by {item.author}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: theme.light.background, // Use light theme background
  },
  title: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginBottom: hp(2),
    color: theme.light.text, // Use light theme text color
  },
  postContainer: {
    marginBottom: hp(2),
    padding: wp(4),
    backgroundColor: theme.light.tint, // Use light theme tint for card background
    borderRadius: wp(2),
  },
  postContent: {
    fontSize: hp(2.2),
    color: theme.light.text, // Use light theme text color
  },
  postAuthor: {
    fontSize: hp(1.8),
    color: theme.light.icon, // Use light theme icon color for author text
    marginTop: hp(0.5),
  },
});

export default Recommendation;
