import React, {useCallback} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';

const LoginScreen = () => {
  const handleSubmit = useCallback(() => {
    console.log('Form submitted!');
  }, []);

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../assets/images/partial-react-logo.png')} // Replace with your image path
            style={styles.background}
            resizeMode="contain" // Options: "cover", "contain", "stretch", "repeat", "center"
          >
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Keyboard.dismiss(); // Dismiss the keyboard
                handleSubmit(); // Submit the form
              }}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Makes sure it covers the entire screen
  },
  container: {
    flex: 1,
    borderWidth: 3,
    borderColor: 'salmon',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;
