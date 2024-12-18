import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { PostComment } from "@/model/postComment";
import auth from "@react-native-firebase/auth";
import { addComment, getPostComments } from "@/lib/postService";
import { Post } from "@/model/post";

interface PostCommentProps {
  post: Post;
}

const PostCommentView: React.FC<PostCommentProps> = ({ post }) => {
  const [postComments, setPostComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

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

  const handleAddComment = async () => {
    if (newComment.trim() === "") return; // Do not add empty comments

    try {
      const accessToken = (await auth().currentUser?.getIdToken()) || "";
      await addComment({ accessToken, postId: post.id, content: newComment });
      setNewComment(""); // Clear the input field
      // Refresh comments
      const comments = await getPostComments(accessToken, post);
      setPostComments(comments);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          placeholderTextColor="#888"
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title="Post" onPress={handleAddComment} />
      </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20, // Rounded corners
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
});

export default PostCommentView;
