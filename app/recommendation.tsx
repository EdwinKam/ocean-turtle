import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import PostCard from "@/components/PostCard";
import { Post } from "@/model/post";
import PostList from "@/components/PostList";

// Create some dummy posts with the new subject field
const dummyPosts: Post[] = [
  {
    subject: "Nature",
    content: "Exploring the beauty of nature",
    author: "Alice",
  },
  { subject: "Technology", content: "The future of technology", author: "Bob" },
  { subject: "Health", content: "Healthy living tips", author: "Charlie" },
  {
    subject: "Travel",
    content: "Traveling the world on a budget",
    author: "Diana",
  },
  {
    subject: "Cooking",
    content: "Mastering the art of cooking",
    author: "Eve",
  },
];

const Recommendation = () => {
  return <PostList posts={dummyPosts} />;
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
});

export default Recommendation;
