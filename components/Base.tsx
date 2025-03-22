import {KeyboardAvoidingView, Platform, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Header from './Header';
import OMS_Blue from '@/assets/images/OMS_Blue.svg';
import Logo from '@/assets/images/Logo.svg';

type BasePprops = PropsWithChildren<{}>;

const Base = ({children}: BasePprops) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={{alignItems: 'center', padding: 20, backgroundColor: '#fff'}}>
        <OMS_Blue style={{}} width={100} />
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
  content: {
    flex: 1,
    gap: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 16,
  },
});
