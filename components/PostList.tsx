import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import PostCard from "@/components/PostCard";
import { Post } from "@/model/post";
import LoadingPostCard from "./LoadingPostCard";

type PostListProps = {
  posts?: Post[];
  showCreationDate?: boolean;
  triggerRefresh: () => void;
};

const PostList = ({
  posts,
  showCreationDate,
  triggerRefresh,
}: PostListProps) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await triggerRefresh(); // Call the refresh function passed from the parent
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {!posts ? (
        // Show loading cards when there are no posts
        <LoadingPostCard />
      ) : posts.length === 0 ? (
        <Text>empty</Text>
      ) : (
        // Show real posts when available
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id} // Use a unique identifier if available
          numColumns={2}
          renderItem={({ item }) => (
            <PostCard post={item} showCreationDate={showCreationDate} />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
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
