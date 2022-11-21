import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from '@emotion/native';

import {Text} from '$src/kit/components';

import {ItemGeneric} from '$features/items/itemsTypes';

import {Space} from '$kit/components';

import {FavButton} from './FavButton';

type ItemCardProps = ItemGeneric & {
  onLike: (itemId: number) => void;
  onBuy: (item: ItemGeneric) => void;
  onSelect: (itemId: number) => void;
  separated: boolean;
  isFavourite: boolean;
};

export const ItemCard = ({
  separated,
  isFavourite,
  onLike,
  onSelect,
  onBuy,
  ...item
}: ItemCardProps) => {
  const {t} = useTranslation();
  const {image, name, id, price} = item;
  const onPress = useCallback(() => onSelect(id), [id, onSelect]);
  const onLikeItem = useCallback(() => onLike(id), [id, onLike]);
  const onBuyItem = useCallback(() => onBuy(item), [item, onBuy]);

  return (
    <Card separated={separated} onPress={onPress}>
      <CardImage source={{uri: image}} resizeMode={'cover'} />
      <DetailsContainer>
        <Title>{name}</Title>

        <Title>{t('items.price', {price})}</Title>

        <Space x2 />

        <TouchableOpacity onPress={onBuyItem}>
          <Action>{t('items.shopNow')}</Action>
        </TouchableOpacity>
        <FavAction>
          <FavButton state={isFavourite} onLike={onLikeItem} />
        </FavAction>
      </DetailsContainer>
    </Card>
  );
};

const Card = styled.TouchableOpacity<{separated: boolean}>(
  ({theme, separated}) => ({
    backgroundColor: theme.color.card,
    flex: 0.5,
    height: '100%',
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: separated ? theme.size.x2 : 0,
    borderRadius: theme.size.x1,
    overflow: 'hidden',
  }),
);
const CardImage = styled(FastImage)(({theme}) => ({
  width: theme.dimension.window.width / 2 - theme.size.x3,
  height: theme.dimension.window.width / 2 - theme.size.x3,
}));
const DetailsContainer = styled.View(({theme}) => ({
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.size.x2,
  width: '100%',
}));
const Title = styled(Text)(() => ({
  textAlign: 'center',
}));
const Action = styled(Text)(() => ({
  textAlign: 'center',
  textDecorationStyle: 'solid',
  textDecorationLine: 'underline',
  fontWeight: 'bold',
}));
const FavAction = styled.View(({theme}) => ({
  position: 'absolute',
  right: theme.size.x2,
  bottom: theme.size.x2,
}));
