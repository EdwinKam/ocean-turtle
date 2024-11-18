import Icon from '@/assets/icons';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import { theme } from '@/constants/theme';
import { hp, wp } from '@/lib/common';
import { authWithGoogle, verifyToken } from '@/lib/firebase';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

const SignUp = () => {
  const router = useRouter();
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert('Sign Up', 'Please fill all the fields!');

      return;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const firebaseUserCredential = await authWithGoogle(); // Use the new function
      const firebaseToken = await firebaseUserCredential.user.getIdToken();

      const responseData = await verifyToken(firebaseToken); // Use the new function
      if (responseData.errorCode || !responseData.validToken) {
        Alert.alert('Sign Up', 'Google Sign Up was unsuccessful');
        return;
      }

      router.push('/home');
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Sign Up', 'Google Sign Up was unsuccessful');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* welcome */}
        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.light.text }}>
            Please enter the details to create an account
          </Text>
          <Input
            icon={
              <Icon
                name='user'
                size={26}
                strokeWidth={1.6}
              />
            }
            placeholder='Enter your username'
            onChangeText={(value) => {
              usernameRef.current = value;
            }}
          />
          <Input
            icon={
              <Icon
                name='mail'
                size={26}
                strokeWidth={1.6}
              />
            }
            placeholder='Enter your email'
            onChangeText={(value) => {
              emailRef.current = value;
            }}
          />
          <Input
            icon={
              <Icon
                name='lock'
                size={26}
                strokeWidth={1.6}
              />
            }
            placeholder='Enter your password'
            onChangeText={(value) => {
              passwordRef.current = value;
            }}
            secureTextEntry={true}
          />
          <Button
            title={'Sign Up'}
            loading={loading}
            onPress={onSubmit}
            buttonStyle={undefined}
            textStyle={undefined}
          />
          <Button
            title='Sign Up with Google'
            loading={loading}
            onPress={signInWithGoogle}
            buttonStyle={styles.googleButton}
            textStyle={styles.googleButtonText}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable
            onPress={() => {
              router.push('/signin');
            }}
          >
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.light.tabIconSelected,
                  fontWeight: theme.fonts.semibold,
                },
              ]}
            >
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },

  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.light.text,
  },

  form: {
    gap: 25,
  },

  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.light.text,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  footerText: {
    textAlign: 'center',
    color: theme.light.text,
    fontSize: hp(1.6),
  },

  googleButton: {
    backgroundColor: '#4285F4',
  },

  googleButtonText: {
    color: '#fff',
  },
});
