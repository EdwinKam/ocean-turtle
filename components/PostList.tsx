import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import PostCard from "@/components/PostCard";
import { Post } from "@/model/post";

type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        key={2} // Ensure a static key for consistent rendering
        renderItem={({ item }) => <PostCard post={item} />} // Use PostCard component
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
