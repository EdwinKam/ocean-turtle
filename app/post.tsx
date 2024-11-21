import ScreenWrapper from '@/components/ScreenWrapper';
import { theme } from '@/constants/theme';
import { hp, wp } from '@/lib/common';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Post = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Create Post</Text>
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
    textAlign: 'center',
    fontWeight: theme.fonts.extrabold,
  },
});
