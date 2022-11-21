import React from 'react';
import styled from '@emotion/native';

import {Text} from '$src/kit/components';

interface ItemDetailsTitleProps {
  children: string;
}

export const ItemDetailsTitle: React.FC<ItemDetailsTitleProps> = ({
  children,
}) => {
  return <Title>{children}</Title>;
};

const Title = styled(Text)(({theme}) => ({
  textAlign: 'center',
  color: theme.color.tint,
  fontSize: theme.size.x3,
  fontWeight: 'bold',
}));
