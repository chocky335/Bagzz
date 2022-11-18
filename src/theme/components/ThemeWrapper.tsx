import React from 'react';
import {ThemeProvider} from '@emotion/react';

import {useThemePreset} from '$theme/theme';

const ThemeWrapper: React.FC<React.PropsWithChildren> = ({children}) => {
  const themePreset = useThemePreset();
  return <ThemeProvider theme={themePreset}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
