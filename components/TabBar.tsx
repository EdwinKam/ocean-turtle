import Icon from "@/assets/icons";
import { theme } from "@/constants/theme";
import { Router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

type TabBarProps = {
  size?: number;
  router: Router;
};

const TabBar: React.FC<TabBarProps> = ({ size = 26, router }) => {
  return (
    <View style={styles.tabBar}>
      <Pressable
        onPress={() => {
          router.push("/home");
        }}
        style={styles.button}
      >
        <Icon
          name="home"
          strokeWidth={2.5}
          size={size}
          color={theme.light.text}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          router.push("/post");
        }}
        style={styles.button}
      >
        <Icon
          name="addSquare"
          strokeWidth={2.5}
          size={size}
          color={theme.light.text}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          router.push("/profile");
        }}
        style={styles.button}
      >
        <Icon
          name="profile"
          strokeWidth={2.5}
          size={size}
          color={theme.light.text}
        />
      </Pressable>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },

  button: {
    alignSelf: "center",
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(0,0,0,0.07)",
  },
});
