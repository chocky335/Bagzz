import {ViewStyle} from 'react-native';
import styled from '@emotion/native';

interface ScreenProps {
  insetTop?: boolean;
  insetBottom?: boolean;
}

export const Screen = styled.View<ScreenProps>(
  ({theme, insetTop, insetBottom}) => {
    const insetsStyle: ViewStyle = {
      backgroundColor: theme.color.background,
      flex: 1,
    };

    if (insetTop) {
      insetsStyle.paddingTop = theme.insets.top;
    }
    if (insetBottom) {
      insetsStyle.paddingBottom = theme.insets.bottom;
    }

    return insetsStyle;
  },
);
