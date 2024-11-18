import ScreenWrapper from '@/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text } from 'react-native';

const Index = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <Text>index</Text>
      <Button
        title='welcome'
        onPress={() => {
          router.push('/welcome');
        }}
      />
    </ScreenWrapper>
  );
};

export default Index;
