import Loading from '@/components/Loading';
import { theme } from '@/constants/theme';
import { hp } from '@/lib/common';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Button = ({
  buttonStyle,
  textStyle,
  title = '',
  onPress = () => {},
  loading = false,
  hasShadow = true,
}) => {
  const shadowStyle = {
    shadowColor: theme.light.text,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) {
    return (
      <View
        style={[
          styles.button,
          buttonStyle,
          { backgroundColor: theme.light.background },
        ]}
      >
        <Loading />
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonStyle, hasShadow && shadowStyle]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.light.tint,
    height: hp(6.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderCurve: 'continuous',
    borderRadius: theme.radius.xl,
  },

  text: {
    fontSize: hp(2.5),
    color: theme.light.background,
    fontWeight: theme.fonts.bold,
  },
});