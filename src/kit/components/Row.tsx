import {ViewStyle} from 'react-native';
import styled from '@emotion/native';

interface RowProps {
  centered?: boolean;
  centeredVertically?: boolean;
}

export const Row = styled.View(({centered, centeredVertically}: RowProps) => {
  const insetsStyle: ViewStyle = {flexDirection: 'row'};

  if (centered || centeredVertically) {
    insetsStyle.alignItems = 'center';
  }

  return insetsStyle;
});
