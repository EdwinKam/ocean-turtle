import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns"; // Import the format function from date-fns
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import { Post } from "@/model/post";
import { useRouter } from "expo-router";

interface PostCardProps {
  post: Post;
  showCreationDate?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showCreationDate }) => {
  const router = useRouter();

  // Format the creationTs to the desired format
  const formattedDate = post.creationTs
    ? format(new Date(post.creationTs), "MMM d, yyyy")
    : "null";

  const handlePress = () => {
    router.push(`/viewpost/${post.id}`); // Navigate to the /post route
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.postContainer}>
      <View style={{ height: "100%", width: "100%" }}>
        <View style={styles.imagePlaceholder}>
          <Image
            source={{
              uri: "https://64.media.tumblr.com/b4f649d5fd4e5e8c2ae3bd66a5783016/18ce8e60dacba0b7-c5/s1280x1920/18278335098dbe59b5d5db9f8af65fb7789efbb0.jpg",
            }}
            style={{ height: "100%", width: "100%" }} // Apply the style here
          />
        </View>
        <Text style={[styles.textPadding, styles.postSubject]}>
          {post.content}
        </Text>
        {!showCreationDate ? (
          <Text style={[styles.textPadding, styles.postAuthor]}>
            {post.author?.username || "null"}
          </Text>
        ) : (
          <Text style={[styles.textPadding, styles.creationDate]}>
            {formattedDate}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    marginBottom: hp(0.5),
    marginHorizontal: wp(0.5),
    backgroundColor: "#f9fcff",
    borderRadius: wp(3),
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
    height: hp(30), // Increase height if needed
  },
  textPadding: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  postSubject: {
    fontSize: hp(1.5),
    color: theme.light.text,
    flexWrap: "wrap",
  },
  imagePlaceholder: {
    width: "100%",
    height: "70%", // Adjust height to allow more space for text
    backgroundColor: "blue",
  },
  textContainer: {
    flexDirection: "column", // Stack text elements vertically
    alignItems: "flex-start",
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  postAuthor: {
    fontSize: hp(1),
    color: theme.light.icon,
    marginBottom: hp(0.5), // Add margin to separate from creation date
  },
  creationDate: {
    fontSize: hp(1),
    color: theme.light.icon,
    fontStyle: "italic",
  },
});

export default PostCard;
