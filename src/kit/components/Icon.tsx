import React from 'react';
import RNFontistoIcon from 'react-native-vector-icons/Fontisto';
import {IconProps} from 'react-native-vector-icons/Icon';
import RNIonIcon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@emotion/react';

export const IonIcon: React.FC<IconProps> = props => {
  const theme = useTheme();
  return <RNIonIcon color={theme.color.primary} {...props} />;
};

export const FontistoIcon: React.FC<IconProps> = props => {
  const theme = useTheme();
  return <RNFontistoIcon color={theme.color.primary} {...props} />;
};
