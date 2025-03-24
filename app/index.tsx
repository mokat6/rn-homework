import {useRouter} from 'expo-router';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Base from '@/components/Base';
import MyInput from '@/components/MyInput';
import {login} from '@/api/auth';
import AppButton from '@/components/AppButton';
import Toast from 'react-native-toast-message';
import {useLanguage} from '@/contexts/LanguageContext';

const gatekeeper = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const passwordRef = useRef<TextInput>(null);
  const [isValid, setIsValid] = useState(false);
  const {t} = useLanguage();
  const router = useRouter();

  const handleChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const handleChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  useEffect(() => {
    const nowValid = isValidEmail(email) && password.length > 5;
    if (nowValid !== isValid) setIsValid(nowValid);
  }, [password, email]);

  console.log('RENDERS');
  const onPress = async () => {
    console.log('pressing');
    console.log('id: ', email);
    console.log('password: ', password);

    try {
      await login({email, password});
      console.log('in component try after log in');
      router.replace('/(tabs)/profile');
    } catch (err) {
      let errorMessage = 'An unexpected error occurred';
      if (err instanceof Error) {
        console.log('Handling login failure:', err.message);
        errorMessage = err.message;
      }
      console.log(errorMessage);

      Toast.show({
        type: 'error',
        text1: errorMessage,
        // text2: 'Incorrect email or password',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  const handleEmailSubmit = useCallback(() => {
    console.log('handlling email submit');
    passwordRef.current?.focus();
  }, []);

  return (
    <Base>
      <MyInput
        // placeholder="El. paštas"
        placeholder={t('LOGIN_PLACEHOLDER_EMAIL')}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={handleChangeEmail}
        onEndEditing={handleEmailSubmit}
        returnKeyType="next"
        floating
      />
      <MyInput
        ref={passwordRef}
        autoCapitalize="none"
        returnKeyType="send"
        placeholder={t('LOGIN_PLACEHOLDER_PASSWORD')}
        onChangeText={handleChangePassword}
        isPassword
        onSubmitEditing={onPress}
        floating
      />

      <AppButton primary onPress={onPress} disabled={!isValid}>
        {t('LOGIN_BUTTON_TEXT')}
      </AppButton>
    </Base>
  );
};

export default gatekeeper;

const styles = StyleSheet.create({});

const isValidEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
