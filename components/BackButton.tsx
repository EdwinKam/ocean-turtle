import Icon from '@/assets/icons';
import { theme } from '@/constants/theme';
import { Router } from 'expo-router';
import {
  Pressable,
  StyleSheet
} from 'react-native';

type BackButtonProps = {
  size?: number;
  router: Router; // Explicitly type the router prop
};

const BackButton: React.FC<BackButtonProps> = ({ size = 26, router }) => {
  return (
    <Pressable
      onPress={() => {
        router.back();
      }}
      style={styles.button}
    >
      <Icon
        name='arrowLeft'
        strokeWidth={2.5}
        size={size}
        color={theme.light.text}
      />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.07)',
  },
});