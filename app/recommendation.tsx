import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import PostCard from "@/components/PostCard";
import { Post } from "@/model/post";
import PostList from "@/components/PostList";
import auth from "@react-native-firebase/auth";
import {
  getBatchPost,
  getRecommendationPostIdsForUser,
} from "@/lib/postService";

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
  const [postIds, setPostIds] = React.useState<string[]>([]);
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const fetchAccessTokenAndPosts = async () => {
      try {
        const accessToken = (await auth().currentUser?.getIdToken()) || "";
        const postIds = await getRecommendationPostIdsForUser({ accessToken });
        setPostIds(postIds);

        const posts = await getBatchPost({ accessToken, postIds });
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching access token or posts:", error);
      }
    };

    fetchAccessTokenAndPosts();
  }, []); // Add dependencies if needed

  return (
    <PostList
      posts={posts.map((post) => ({
        subject: post.content,
        content: "Default content", // Replace with actual content if available
        author: "Unknown author", // Replace with actual author if available
      }))}
    />
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
});

export default Recommendation;
