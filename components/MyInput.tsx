import {StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {forwardRef, useEffect, useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import Animated, {Easing, useSharedValue, withTiming, interpolate, useAnimatedStyle} from 'react-native-reanimated';
import theme from '@/constants/Theme';

type MyInputProps = Pick<
  TextInputProps,
  | 'secureTextEntry'
  | 'maxLength'
  | 'onChangeText'
  | 'onEndEditing'
  | 'placeholder'
  | 'returnKeyType'
  | 'autoCapitalize'
  | 'keyboardType'
  | 'returnKeyType'
  | 'onSubmitEditing'
  | 'defaultValue'
> & {
  style?: ViewStyle;
  isPassword?: boolean;
  floating?: boolean;
};

const MyInput = forwardRef<TextInput, MyInputProps>(
  ({isPassword, style, onChangeText, placeholder, floating, ...props}, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState<boolean>(!props.defaultValue);
    const placeholderAnim = useSharedValue(0);

    const handleChangeText = (text: string) => {
      const isNowEmpty = !text;
      if (isNowEmpty !== isInputEmpty) setIsInputEmpty(isNowEmpty);

      if (onChangeText) onChangeText(text);
    };

    useEffect(() => {
      if (!floating) return;

      placeholderAnim.value = withTiming(!isInputEmpty || isFocused ? 1 : 0, {
        duration: 100,
        easing: Easing.ease,
      });
    }, [isInputEmpty, isFocused]);

    const placeholderStyle = useAnimatedStyle(() => {
      if (!floating) {
      }
      return {
        top: interpolate(placeholderAnim.value, [0, 1], [12, -10]),
        fontSize: interpolate(placeholderAnim.value, [0, 1], [16, 12]),
      };
    });

    return (
      <View style={[styles.container, style]}>
        {floating && <Animated.Text style={[styles.placeholder, placeholderStyle]}>{placeholder}</Animated.Text>}
        <TextInput
          ref={ref}
          style={styles.input}
          secureTextEntry={isPassword && !isPasswordVisible}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={!floating ? placeholder : undefined}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity style={styles.icon} onPress={() => setIsPasswordVisible(prev => !prev)}>
            <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

export default MyInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 6,
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
  },
  icon: {
    paddingRight: 6,
  },
  placeholderContainer: {},
  placeholder: {
    position: 'absolute',
    left: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 8,
    color: theme.colors.secondary,
  },
});
