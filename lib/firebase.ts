import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_FIREBASE_CLIENT_ID,
});

export const authWithGoogle = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();

  const token = userInfo.data?.idToken;
  if (!token) {
    throw new Error('No token found in user info');
  }

  const googleCredential = auth.GoogleAuthProvider.credential(token);
  return await auth().signInWithCredential(googleCredential);
};

export const verifyToken = async (firebaseToken: string) => {
  const response = await fetch(
    `http://${process.env.EXPO_PUBLIC__BACKEND_HOST}/auth/verify?accessToken=${firebaseToken}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return await response.json();
};
