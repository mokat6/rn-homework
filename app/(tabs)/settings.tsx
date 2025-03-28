import {StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/contexts/ThemeContext';
import AppPicker from '@/components/AppPicker';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

const themes = [
  {label: 'Light', value: 'light'},
  {label: 'Dark', value: 'dark'},
  {label: 'System', value: 'system'},
];

const settings = () => {
  const {theme, setTheme} = useTheme();

  const handler = () => {
    console.log('handler firing');
  };

  const selected = themes.find(themeItem => themeItem.value === theme);

  const onSelect = (item: any) => setTheme(item.value);

  const renderItem = (item: any) => {
    return <ThemedText>{item.label}</ThemedText>;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText>settings</ThemedText>
      <AppPicker data={themes} selectedValue={selected!} onSelect={onSelect} renderItem={renderItem} />
      {/* <AppSwitch title="dark mode" value={false} onChangeHandler={handler} /> */}
    </ThemedView>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
});
