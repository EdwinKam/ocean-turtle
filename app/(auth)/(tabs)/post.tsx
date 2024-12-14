import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/common";
import { createPost } from "@/lib/postService";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useAfterAuthContext } from "@/components/globalContext";

const Post = () => {
  const router = useRouter();

  const [postContent, setPostContent] = React.useState("");
  const [loading, setLoading] = React.useState(false); // Add loading state
  const { setCreatedPost } = useAfterAuthContext();

  const submitCreatePost = async () => {
    setLoading(true); // Set loading to true when the request starts
    try {
      const accessToken = (await auth().currentUser?.getIdToken()) || "";
      await createPost({ accessToken, content: postContent });
      setCreatedPost((prev) => prev + 1);
      router.push("/home");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Create Post</Text>
        <Input
          placeholder="Enter post content"
          onChangeText={(value) => {
            setPostContent(value);
          }}
        />
        <Button title={"Submit"} onPress={submitCreatePost} loading={loading} />
      </View>
    </ScreenWrapper>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 0,
    paddingHorizontal: wp(5),
  },

  title: {
    color: theme.light.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: theme.fonts.extrabold,
  },
});
