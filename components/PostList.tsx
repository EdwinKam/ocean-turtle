import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import PostCard from "@/components/PostCard";
import { Post } from "@/model/post";

type PostListProps = {
  posts: Post[];
  showCreationDate?: boolean;
};

const PostList = ({ posts, showCreationDate }: PostListProps) => {
  // Sort posts if sortByCreationTs is true
  if (showCreationDate) {
    posts = [...posts].sort((a, b) => b.creationTs - a.creationTs);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id} // Use a unique identifier if available
        numColumns={2}
        renderItem={({ item }) => (
          <PostCard post={item} showCreationDate={showCreationDate} />
        )}
      />
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
