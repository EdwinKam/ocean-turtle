import LikeButton from "@/components/LikeButton";
import { theme } from "@/constants/theme";
import useAuth from "@/lib/auth";
import { hp, wp } from "@/lib/common";
import { getPostLikeCount, likePost, unlikePost } from "@/lib/postService";
import { Post } from "@/model/post";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PostCardProps {
  post: Post;
  showCreationDate?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showCreationDate }) => {
  const { accessToken } = useAuth();
  const [isLiked, setIsLiked] = React.useState(post.likedByCurrentUser);
  const [likeCount, setLikeCount] = React.useState(-1);
  const router = useRouter();

  const handlePress = () => {
    router.push(`/viewpost/${post.id}`);
  };

  const handleLike = async () => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    try {
      if (isLiked) {
        setLikeCount((count) => count - 1);
        unlikePost(accessToken, post.id).catch((error) => {
          console.error("Error unliking post:", error);
        });
      } else {
        setLikeCount((count) => count + 1);
        likePost(accessToken, post.id).catch((error) => {
          console.error("Error liking post:", error);
        });
      }
      setIsLiked((liked) => !liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  useEffect(() => {
    const fetchLikeCount = async () => {
      if (!accessToken) {
        console.error("No access token available");
        return;
      }

      try {
        const count = await getPostLikeCount(accessToken, post.id);
        setLikeCount(count);
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };

    if (accessToken) {
      fetchLikeCount();
    }
  }, [accessToken, post.id]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.postContainer}>
      {post.imageUrls.length ? (
        <ImagePostCard post={post} showCreationDate={showCreationDate} />
      ) : (
        <TextPostCard post={post} showCreationDate={showCreationDate} />
      )}
      <View style={styles.bottomContainer}>
        <Text style={styles.postAuthor}>{post.author?.username || "null"}</Text>
        <View style={styles.likeButtonContainer}>
          <LikeButton
            likes={likeCount}
            isLiked={isLiked}
            onPress={handleLike}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface PostCardChildProps {
  post: Post;
  showCreationDate?: boolean;
}

const PostContent: React.FC<PostCardChildProps> = ({
  post,
  showCreationDate,
}) => {
  const formattedDate = post.creationTs
    ? format(new Date(post.creationTs), "MMM d, yyyy")
    : "null";

  return (
    <View style={styles.textColumn}>
      <Text style={styles.postSubject}>{post.subject || post.content}</Text>
      {post.subject && <Text style={styles.postContent}>{post.content}</Text>}
      {showCreationDate && (
        <Text style={styles.creationDate}>{formattedDate}</Text>
      )}
    </View>
  );
};

const TextPostCard: React.FC<PostCardChildProps> = ({
  post,
  showCreationDate,
}) => {
  return (
    <View style={styles.contentContainer}>
      <PostContent post={post} showCreationDate={showCreationDate} />
    </View>
  );
};

const ImagePostCard: React.FC<PostCardChildProps> = ({
  post,
  showCreationDate,
}) => {
  return (
    <View style={styles.contentContainer}>
      {post.imageUrls?.[0] && (
        <View style={styles.imagePlaceholder}>
          <Image
            source={{
              uri: post.imageUrls?.[0] || "",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}
      <PostContent post={post} showCreationDate={showCreationDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    marginBottom: hp(1.2),
    marginHorizontal: wp(2),
    backgroundColor: "#ffffff",
    borderRadius: wp(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  contentContainer: {
    width: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    aspectRatio: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: wp(1),
  },
  postSubject: {
    fontSize: hp(2),
    fontWeight: "600",
    color: theme.light.text,
    marginBottom: hp(1),
    margin: hp(1),
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
  textColumn: {
    flex: 1,
    paddingRight: wp(2),
  },
  postContent: {
    fontSize: hp(1.5),
    color: theme.light.text,
    margin: hp(1),
    marginBottom: hp(0.25),
  },
  postAuthor: {
    fontSize: hp(1.4),
    color: theme.light.icon,
    fontWeight: "500",
  },
  likeButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textPadding: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  creationDate: {
    fontSize: hp(1),
    color: theme.light.icon,
    fontStyle: "italic",
  },
});

export default PostCard;
