import ArrowLeft from '@/assets/icons/ArrowLeft';
import Home from '@/assets/icons/Home';
import Lock from '@/assets/icons/Lock';
import Mail from '@/assets/icons/Mail';
import User from '@/assets/icons/User';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

const icons: Record<string, React.FC<SvgProps>> = {
  home: Home,
  arrowLeft: ArrowLeft,
  mail: Mail,
  lock: Lock,
  user: User,
};

type IconProps = SvgProps & {
  name: keyof typeof icons;
  size?: number;
  strokeWidth?: number;
  color?: string;
};

const Icon: React.FC<IconProps> = ({
  name,
  size = '24',
  strokeWidth = 1.0,
  color = 'black',
  ...props
}) => {
  const IconComponent = icons[name];

  return (
    <IconComponent
      height={size}
      width={size}
      strokeWidth={strokeWidth}
      color={color}
      {...props}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({});