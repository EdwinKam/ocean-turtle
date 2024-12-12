import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import PostCard from "@/components/PostCard";
import { Post } from "@/model/post";
import LoadingPostCard from "./LoadingPostCard";

type PostListProps = {
  posts: Post[];
  showCreationDate?: boolean;
};

const PostList = ({ posts, showCreationDate }: PostListProps) => {
  // Sort posts if showCreationDate is true
  const sortedPosts = showCreationDate
    ? [...posts].sort((a, b) => b.creationTs - a.creationTs)
    : posts;

  return (
    <View style={styles.container}>
      {sortedPosts.length === 0 ? (
        // Show loading cards when there are no posts
        <FlatList
          data={[...Array(20).keys()]} // Create an array to render multiple loading cards
          keyExtractor={(item) => item.toString()}
          numColumns={2}
          renderItem={() => <LoadingPostCard />}
        />
      ) : (
        // Show real posts when available
        <FlatList
          data={sortedPosts}
          keyExtractor={(item) => item.id} // Use a unique identifier if available
          numColumns={2}
          renderItem={({ item }) => (
            <PostCard post={item} showCreationDate={showCreationDate} />
          )}
        />
      )}
    </View>
  );
};

export default PostList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(1),
    backgroundColor: theme.light.background, // Use light theme background
  },
});
