import {ReturnKeyTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {Ionicons} from '@expo/vector-icons'; // Import icons from expo or use react-native-vector-icons

interface MyInputProps {
  secureTextEntry?: boolean;
  maxLength?: number;
  style?: ViewStyle;
  onChangeText?: (text: string) => void;
  onEndEditing?: () => void;
  placeholder?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  isPassword?: boolean;
}

const MyInput = (props: MyInputProps) => {
  const {isPassword, placeholder} = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={isPassword && !isPasswordVisible} // Toggle password visibility
      />
      {isPassword && (
        <TouchableOpacity style={styles.icon} onPress={() => setIsPasswordVisible(prev => !prev)}>
          <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

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
