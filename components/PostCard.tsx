import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import { Post } from "@/model/post";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.postSubject}>{post.subject}</Text>
      <View style={styles.imagePlaceholder} />
      <Text style={styles.postContent}>{post.content}</Text>
      <Text style={styles.postAuthor}>by {post.author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1, // Ensure each item takes up equal space
    marginBottom: hp(2),
    marginHorizontal: wp(2), // Add horizontal margin for spacing
    padding: wp(4),
    backgroundColor: theme.light.cardBackground, // Use theme for card background
    borderRadius: wp(2),
    alignItems: "center", // Center items vertically
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Elevation for Android
    elevation: 3,
    // Border properties
    borderWidth: 1,
    borderColor: theme.light.icon, // Use a theme color for the border
  },
  postSubject: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: theme.light.text, // Use light theme text color
    marginBottom: hp(1),
  },
  imagePlaceholder: {
    width: wp(15), // Reserve space for the image
    height: wp(15),
    backgroundColor: theme.light.icon, // Placeholder color
    borderRadius: wp(2),
    marginBottom: hp(1), // Space between image and text
  },
  postContent: {
    fontSize: hp(2.2),
    color: theme.light.text, // Use light theme text color
    marginBottom: hp(0.5),
  },
  postAuthor: {
    fontSize: hp(1.8),
    color: theme.light.icon, // Use light theme icon color for author text
  },
});

export default PostCard;
