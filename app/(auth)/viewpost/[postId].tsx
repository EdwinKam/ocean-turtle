import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

const ViewPost = () => {
  const { postId } = useLocalSearchParams();
  return <Text>Post ID: {postId}</Text>;
};

export default ViewPost;
