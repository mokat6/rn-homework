import {
  ReturnKeyTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {forwardRef, useState} from 'react';
import {Ionicons} from '@expo/vector-icons'; // Import icons from expo or use react-native-vector-icons

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
> & {
  style?: ViewStyle;
  isPassword?: boolean;
};

const MyInput = forwardRef<TextInput, MyInputProps>(({isPassword, style, ...props}, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        ref={ref}
        style={styles.input}
        secureTextEntry={isPassword && !isPasswordVisible} // Toggle password visibility
        {...props}
      />
      {isPassword && (
        <TouchableOpacity style={styles.icon} onPress={() => setIsPasswordVisible(prev => !prev)}>
          <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
});

export default MyInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 6,
    paddingHorizontal: 16,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    flex: 1, // Take up all available space
    paddingVertical: 14,
  },
  icon: {
    paddingRight: 6,
  },
});
