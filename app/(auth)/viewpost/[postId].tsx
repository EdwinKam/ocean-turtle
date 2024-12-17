import React, { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import BackButton from "@/components/BackButton";
import { Post } from "@/model/post";
import { readPost } from "@/lib/postService";
import auth from "@react-native-firebase/auth";
import ViewImagePostPage from "@/components/ViewImagePostPage";

const { width: screenWidth } = Dimensions.get("window");

const ViewPost = () => {
  const router = useRouter();
  const { postId } = useLocalSearchParams();
  const [post, setPost] = React.useState<Post>();

  const enrichPost = async () => {
    const accessToken = (await auth().currentUser?.getIdToken()) || "";
    const post = await readPost(accessToken, postId);
    setPost(post);
  };

  useEffect(() => {
    enrichPost();
  }, []);

  // Dummy comments data
  const comments = [
    { id: "1", username: "user1", comment: "Nice post!" },
    { id: "2", username: "user2", comment: "Love this!" },
    { id: "3", username: "user3", comment: "Amazing content!" },
  ];

  return (
    <View style={styles.container}>
      <BackButton router={router} />
      <ViewImagePostPage post={post!} comments={comments} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  postContainer: {
    alignItems: "center",
    margin: 20,
  },
  authorName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: screenWidth,
    height: screenWidth, // Assuming a square image for simplicity
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  commentUsername: {
    fontWeight: "bold",
    marginRight: 5,
  },
  commentText: {
    fontSize: 16,
  },
});

export default ViewPost;
