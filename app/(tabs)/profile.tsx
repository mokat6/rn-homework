import {useRouter} from 'expo-router';

import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Base from '@/components/Base';
import {logout} from '@/api/auth';
import AppButton from '@/components/AppButton';
import Toast from 'react-native-toast-message';
import {useLanguage} from '@/contexts/LanguageContext';
import {User, useUser} from '@/contexts/UserContext';
import theme from '@/constants/Theme';

const userInfoKeys = {
  email: 'PROFILE_EMAIL',
  description: 'PROFILE_DESCRIPTION',
} as const;

const profile = () => {
  const {t} = useLanguage();
  const router = useRouter();
  const {user} = useUser();

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

  const renderUserInfo = () => {
    if (user === null) return <Text>loading info</Text>;

    return Object.entries(user).map(([key, value]) => {
      if (key === 'id') return null;
      if (key in userInfoKeys) {
        const translateKey = userInfoKeys[key as keyof typeof userInfoKeys];
        if (translateKey === undefined) return null;

        return (
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text key={value} style={{fontFamily: theme.fonts.bold}}>
              {t(translateKey) || key}:
            </Text>
            <Text>{value}</Text>
          </View>
        );
      }
    });
  };

  return (
    <Base>
      {renderUserInfo()}
      <AppButton primary onPress={onPress}>
        {t('LOGOUT_BUTTON_TEXT')}
      </AppButton>
    </Base>
  );
};

export default profile;

const styles = StyleSheet.create({});
