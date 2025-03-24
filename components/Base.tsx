import {KeyboardAvoidingView, Platform, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Header from './Header';
import OMS_Blue from '@/assets/images/OMS_Blue.svg';
import Logo from '@/assets/images/Logo.svg';
import theme from '@/constants/Theme';

type BasePprops = PropsWithChildren<{}>;

const Base = ({children}: BasePprops) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.topLogoCont}>
        <OMS_Blue />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <View style={styles.content}>{children}</View>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Logo width={47} />
      </View>
    </View>
  );
};

export default Base;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topLogoCont: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    gap: 15,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 30,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 16,
    backgroundColor: theme.colors.white,
  },
});
