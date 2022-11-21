import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from '@emotion/react';

import {IonIcon} from '$kit/components';

type FavButtonProps = {
  onLike: (state: boolean) => void;
  state: boolean;
};

export const FavButton = ({state, onLike}: FavButtonProps) => {
  const {size, dimension} = useTheme();
  const toggle = useCallback(() => onLike(!state), [onLike, state]);

  return (
    <TouchableOpacity onPress={toggle} hitSlop={dimension.hitSlop.default}>
      <IonIcon size={size.x3} name={state ? 'heart-sharp' : 'heart-outline'} />
    </TouchableOpacity>
  );
};
