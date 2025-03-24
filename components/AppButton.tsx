import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useRef} from 'react';
import theme from '@/constants/Theme';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';

interface AppButtonProps {
  icon?: any;
  iconPosition?: 'left' | 'right';
  color?: string;
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  style?: ViewStyle;
  borderRadius?: number;
  fontSize?: number;
  fontFamily?: string;
  disabled?: boolean;
  onPress?: () => void;
  primary?: boolean;
  secondary?: boolean;
  outline?: boolean;
  children?: string;
}

const AppButton = ({
  icon,
  iconPosition = 'left',
  paddingHorizontal = 20,
  paddingVertical = 8,
  style,
  borderRadius = 6,
  fontSize = 16,
  onPress,
  disabled = false,
  primary = false,
  secondary = false,
  outline = false,
  children = '',
}: AppButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
      disabled={disabled}>
      <Animated.View
        style={[
          animatedStyle,
          styles.button,
          primary && styles.primary,
          primary && disabled && styles.primaryDisabled,
          secondary && styles.secondary,
          secondary && disabled && styles.secondaryDisabled,
          outline && styles.outline,
          outline && disabled && styles.outlineDisabled,
          {paddingHorizontal, paddingVertical, borderRadius},
          style,
        ]}>
        <Text
          style={[
            styles.text,
            primary && styles.primaryText,
            primary && disabled && styles.primaryTextDisabled,
            secondary && styles.secondaryText,
            secondary && disabled && styles.secondaryTextDisabled,
            outline && styles.outlineText,
            outline && disabled && styles.outlineTextDisabled,
            {fontSize},
          ]}>
          {children}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.fonts.regular,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  primaryDisabled: {
    backgroundColor: theme.colors.disabledButton,
  },
  primaryText: {
    color: theme.colors.white,
  },
  primaryTextDisabled: {
    color: theme.colors.disabledButtonText,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  secondaryDisabled: {
    backgroundColor: theme.colors.disabledButton,
  },
  secondaryText: {
    color: theme.colors.white,
  },
  secondaryTextDisabled: {
    color: theme.colors.disabledButtonText,
  },
  outline: {
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    backgroundColor: 'transparent',
  },
  outlineDisabled: {
    borderWidth: 2,
    borderColor: theme.colors.lightGrey,
    backgroundColor: 'transparent',
  },
  outlineText: {
    color: theme.colors.secondary,
  },
  outlineTextDisabled: {
    color: theme.colors.lightGrey,
  },
});
