import {useRouter} from 'expo-router';

import {StyleSheet} from 'react-native';
import React from 'react';
import Base from '@/components/Base';
import {logout} from '@/api/auth';
import AppButton from '@/components/AppButton';
import Toast from 'react-native-toast-message';
import {useLanguage} from '@/contexts/LanguageContext';

const profile = () => {
  const {t} = useLanguage();
  const router = useRouter();

  console.log('RENDERS');

  const onPress = async () => {
    console.log('pressing logout');

    try {
      await logout();
      console.log('after log out ()');
      router.replace('/');
    } catch (err) {
      let errorMessage = 'An unexpected error occurred';
      if (err instanceof Error) {
        console.log('Handling logout failure:', err.message);
        errorMessage = err.message;
      }
      console.log(errorMessage);

      Toast.show({
        type: 'error',
        text1: errorMessage,
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <Base>
      <AppButton primary onPress={onPress}>
        {t('LOGOUT_BUTTON_TEXT')}
      </AppButton>
    </Base>
  );
};

export default profile;

const styles = StyleSheet.create({});
