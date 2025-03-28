import {StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import {useColorScheme} from '@/hooks/useColorScheme';

type AppSwitchProps = {
  onChangeHandler: (e: boolean) => void;
  title?: string;
  value: boolean;
};

const AppSwitch = ({onChangeHandler, title, value}: AppSwitchProps) => {
  return (
    <View>
      <Text>{title}</Text>
      <Switch value={value} onValueChange={onChangeHandler} />
    </View>
  );
};

export default AppSwitch;

const styles = StyleSheet.create({});
