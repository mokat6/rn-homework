import {useColorScheme as useRNColorScheme} from 'react-native';

import {useTheme} from '@/contexts/ThemeContext';

export function useColorScheme() {
  const {theme} = useTheme();

  if (theme === 'system') {
    return useRNColorScheme() ?? 'light';
  }

  return theme;
}
