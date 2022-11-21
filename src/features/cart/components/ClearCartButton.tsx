import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import styled from '@emotion/native';

import {Text} from '$src/kit/components';

import {Space} from '$kit/components';

interface ClearCartButtonProps {
  dataLength: number;
  onResetCart: () => void;
}

export const ClearCartButton = ({
  dataLength,
  onResetCart,
}: ClearCartButtonProps) => {
  const {t} = useTranslation();
  if (dataLength === 0) {
    return null;
  }
  return (
    <TouchableOpacity onPress={onResetCart}>
      <Space x1 />
      <ClearTitle>{t('cart.clearAll')}</ClearTitle>
      <Space x1 />
    </TouchableOpacity>
  );
};

const ClearTitle = styled(Text)({
  textAlign: 'center',
});
