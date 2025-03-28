/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryLight = '#0a7ea4';
const primaryDark = '#fff';
const secondaryLight = '#687076';
const secondaryDark = '#9BA1A6';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    primary: primaryLight,
    icon: secondaryLight,
    tabIconDefault: secondaryLight,
    tabIconSelected: primaryLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    primary: primaryDark,
    icon: secondaryDark,
    tabIconDefault: secondaryDark,
    tabIconSelected: primaryDark,
  },
};

const theme = {
  colors: {
    primary: '#286EE6', // Blue
    // secondary: '#6C757D', // Gray
    secondary: '#777', // Gray
    lightGrey: '#aaa',
    white: '#fff',
    disabled: '#6B8AB9',
    background: '#F8F9FA', // Light background
    primaryText: '#152736', // Dark text
    textSecondary: '#555555', // Gray text
    disabledButton: '#EBEFF9',
    disabledButtonText: '#6B8AB9',
  },
  fonts: {
    regular: 'InterRegular', // Default font
    bold: 'InterBold', // Default font
  },
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
  },
};

export default theme;
