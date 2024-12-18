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

const Recommendation = () => {
  const [postIds, setPostIds] = React.useState<string[]>([]);
  const [posts, setPosts] = React.useState<Post[]>();

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

  useEffect(() => {
    fetchAccessTokenAndPosts();
  }, []); // Add dependencies if needed

  return (
    <PostList posts={posts} triggerRefresh={() => fetchAccessTokenAndPosts()} />
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
