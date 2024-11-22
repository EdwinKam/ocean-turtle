import Loading from '@/components/Loading';
import ScreenWrapper from '@/components/ScreenWrapper';
import { theme } from '@/constants/theme';
import { hp, wp } from '@/lib/common';
import { verifyToken } from '@/lib/firebase';
import auth from '@react-native-firebase/auth'; // Firebase Authentication
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

const Index = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const firebaseToken = user.getIdToken();
        const responseData = await verifyToken(await firebaseToken);
        console.log(responseData);

        if (responseData.errorCode || !responseData.validToken) {
          Alert.alert('Authentication', 'Operation was unsuccessful');
          return;
        }

        console.log('User signed in!');

        router.push('/home');
      } else {
        router.push('/welcome');
      }
      setIsLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, [router]);

  if (isLoading) {
    return (
      <ScreenWrapper>
        <Loading />
      </ScreenWrapper>
    );
  }

  return null;
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 0,
    paddingHorizontal: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: theme.light.text,
    fontSize: hp(4),
    textAlign: 'center',
    fontWeight: theme.fonts.extrabold,
  },
});
