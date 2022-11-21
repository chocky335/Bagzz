import {TextProps as RNTextProps, TextStyle} from 'react-native';
import styled from '@emotion/native';

interface TextProps extends RNTextProps {}

export const Text = styled.Text<TextProps>(({theme}) => {
  const insetsStyle: TextStyle = {
    color: theme.color.primary,
    fontSize: theme.size.x2,
  };

  return insetsStyle;
});
