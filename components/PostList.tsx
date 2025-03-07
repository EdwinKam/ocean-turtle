import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
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
    await triggerRefresh();
    setRefreshing(false);
  };

  if (!posts) {
    return <LoadingPostCard />;
  }

  // Split posts into two columns
  const leftColumnPosts = posts.filter((_, index) => index % 2 === 0);
  const rightColumnPosts = posts.filter((_, index) => index % 2 !== 0);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {posts.length !== 0 ? (
        <View style={styles.container}>
          <View style={styles.column}>
            {leftColumnPosts.map((post) => (
              <View key={post.id} style={styles.postCardContainer}>
                <PostCard post={post} showCreationDate={showCreationDate} />
              </View>
            ))}
          </View>
          <View style={styles.column}>
            {rightColumnPosts.map((post) => (
              <View key={post.id} style={styles.postCardContainer}>
                <PostCard post={post} showCreationDate={showCreationDate} />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text>No Post Found</Text>
      )}
    </ScrollView>
  );
};

export default PostList;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp(1),
    backgroundColor: theme.light.background,
  },
  column: {
    flex: 1,
    alignItems: "center", // Center the items in the column
  },
  postCardContainer: {
    width: wp(48), // Each post card takes up 48% of the screen width
  },
});
