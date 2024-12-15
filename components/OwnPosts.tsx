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
  getOwnPosts,
  getRecommendationPostIdsForUser,
} from "@/lib/postService";
import { useAfterAuthContext } from "./globalContext";

const OwnPosts = () => {
  const [posts, setPosts] = React.useState<Post[]>();
  const { createdPost } = useAfterAuthContext();

  const fetchAccessTokenAndPosts = async () => {
    try {
      const accessToken = (await auth().currentUser?.getIdToken()) || "";
      const posts = await getOwnPosts(accessToken);
      setPosts([...posts].sort((a, b) => b.creationTs - a.creationTs));
    } catch (error) {
      console.error("Error fetching access token or posts:", error);
    }
  };

  useEffect(() => {
    fetchAccessTokenAndPosts();
  }, [createdPost]); // Refresh when createdPost changes

  // Function to trigger a refresh
  const triggerRefresh = () => {
    fetchAccessTokenAndPosts();
  };

  return (
    <PostList posts={posts} showCreationDate triggerRefresh={triggerRefresh} />
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

export default OwnPosts;
