import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { PostComment } from "@/model/postComment";
import auth from "@react-native-firebase/auth";
import { getPostComments } from "@/lib/postService";
import { Post } from "@/model/post";

interface PostCommentProps {
  post: Post;
}

const PostCommentView: React.FC<PostCommentProps> = ({ post }) => {
  const [postComments, setPostComments] = React.useState<PostComment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      if (post) {
        const accessToken = (await auth().currentUser?.getIdToken()) || "";
        const comments = await getPostComments(accessToken, post);
        setPostComments(comments);
      }
    };

    try {
      fetchComments();
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [post]);

  const renderComment = (comment: PostComment) => (
    <View key={comment.commenter.uid} style={styles.commentContainer}>
      <Text style={styles.commentUsername}>{comment.commenter.username}</Text>
      <Text style={styles.commentText}>{comment.content}</Text>
      {comment.childComments && comment.childComments.length > 0 && (
        <View style={styles.childCommentsContainer}>
          {comment.childComments.map(renderComment)}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={postComments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderComment(item)}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // Align the input box to the bottom
  },
  commentContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 5,
    paddingHorizontal: 20, // Add padding to the comments
  },
  childCommentsContainer: {
    paddingLeft: 20, // Indent child comments
  },
  commentUsername: {
    fontWeight: "bold",
    marginRight: 5,
    textAlign: "left",
  },
  commentText: {
    fontSize: 16,
    textAlign: "left",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20, // Rounded corners
    margin: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
});

export default PostCommentView;
