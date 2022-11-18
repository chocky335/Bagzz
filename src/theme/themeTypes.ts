import {ColorSchemeName} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import '@emotion/react';

import {dimensions} from './dimentions';
import {sizes} from './sizes';

export interface Palette {
  primary: string;
  tint: string;
  background: string;
  card: string;
  header: string;
  tabbar: string;
  tabbarTint: string;
  tabbarInactive: string;
}

declare module '@emotion/react' {
  export interface Theme {
    color: Palette;
    size: typeof sizes;
    dimension: typeof dimensions;
    insets: EdgeInsets;
    colorScheme: ColorSchemeName;
  }
}
