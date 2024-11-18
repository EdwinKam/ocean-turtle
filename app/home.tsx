import ScreenWrapper from '@/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text } from 'react-native';

const Home = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <Text>You are in</Text>
      <Button
        title='welcome'
        onPress={() => {
          router.dismissAll();
        }}
      />
    </ScreenWrapper>
  );
};

export default Home;
