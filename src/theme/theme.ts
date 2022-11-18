import {useColorScheme} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Theme} from '@emotion/react';

import {dimensions} from './dimentions';
import {sizes} from './sizes';

export const useThemePreset = (): Theme => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const color =
    colorScheme === 'dark'
      ? require('./paletteDark').default
      : require('./paletteLight').default;
  return {color, insets, size: sizes, dimension: dimensions, colorScheme};
};
