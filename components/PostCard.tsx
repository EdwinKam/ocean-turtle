import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";

// Define the Post interface
export interface Post {
  subject: string;
  content: string;
  author: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.imagePlaceholder} />
      <Text style={[styles.textPadding, styles.postSubject]}>
        {post.subject}
      </Text>
      <Text style={[styles.textPadding, styles.postAuthor]}>{post.author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    marginBottom: hp(0.5),
    marginHorizontal: wp(0.5),
    backgroundColor: "#f9fcff", // Very light blue color
    borderRadius: wp(3),
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden", // Ensure children do not overflow the border radius
    height: hp(27),
  },
  textPadding: {
    paddingHorizontal: wp(3), // Common horizontal padding for all text
    paddingVertical: hp(0.5), // Common vertical padding for all text
  },
  postSubject: {
    fontSize: hp(1.5),
    color: theme.light.text,
  },
  imagePlaceholder: {
    width: "100%", // Make the image take up the full width of the card
    height: "80%", // Adjust the height as needed
    backgroundColor: theme.light.icon,
  },
  postAuthor: {
    fontSize: hp(1),
    color: theme.light.icon,
  },
});

export default PostCard;
