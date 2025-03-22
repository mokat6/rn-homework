import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Base from '@/components/Base';
import MyInput from '@/components/MyInput';
import {login} from '@/api/auth';
import AppButton from '@/components/AppButton';

const xxx = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const passwordRef = useRef<TextInput>(null);
  const [isValid, setIsValid] = useState(false);

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
    } catch (err) {
      console.log('catching errors');
      setError('Login failed, please try again.');
    }
  };

  const handleEmailSubmit = useCallback(() => {
    console.log('handlling email submit');
    passwordRef.current?.focus();
  }, []);

  return (
    <Base>
      <MyInput
        placeholder="El. paštas"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={handleChangeEmail}
        onEndEditing={handleEmailSubmit}
        returnKeyType="next"
      />
      <MyInput
        ref={passwordRef}
        autoCapitalize="none"
        returnKeyType="send"
        placeholder="Slaptažodis"
        onChangeText={handleChangePassword}
        isPassword
        onSubmitEditing={onPress}
      />

      <AppButton primary onPress={onPress} disabled={!isValid}>
        Prisijungti
      </AppButton>
      {error ? <Text>{error}</Text> : null}
    </Base>
  );
};

export default xxx;

const styles = StyleSheet.create({});

const isValidEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
