import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from '@emotion/react';
import styled from '@emotion/native';

import {Screen, Text} from '$src/kit/components';

import {useAddItemToCartMutation} from '$features/cart/cartApi';
import {selectFavouriteIds} from '$features/favourites/favouritesSelectors';
import {toggleFavorite} from '$features/favourites/favouritesSlice';
import {FavButton} from '$features/items/components/FavButton';
import {
  useFetchItemDetailsQuery,
  useFetchItemListQuery,
} from '$features/items/itemsApi';
import {Item} from '$features/items/itemsTypes';

import {Space} from '$kit/components';

import {MainStackProps} from '$navigation/types';

import {useAppDispatch, useAppSelector} from '$store/storeHooks';

export const ItemDetails: React.FC<MainStackProps<'ItemDetails'>> = ({
  route,
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const {t} = useTranslation();
  const favouriteIds = useAppSelector(selectFavouriteIds);
  const [addItemToCartMutation] = useAddItemToCartMutation();
  const {itemId} = route.params;
  const {data: itemsList} = useFetchItemListQuery();
  const {data: item} = useFetchItemDetailsQuery(itemId);
  const itemToDisplay: Item | undefined =
    item ?? itemsList?.find(({id}) => id === itemId);
  const isFav = favouriteIds.includes(itemId);
  const onLike = useCallback(
    () => dispatch(toggleFavorite(itemId)),
    [dispatch, itemId],
  );
  const onBuy = useCallback(
    () => item && addItemToCartMutation(item),
    [item, addItemToCartMutation],
  );

  useEffect(() => {
    navigation.setOptions({
      title: itemToDisplay?.name,
      headerRight: () => <FavButton state={isFav} onLike={onLike} />,
    });
  }, [navigation, itemToDisplay?.name, isFav, onLike]);

  if (!itemToDisplay) {
    return <Card />;
  }

  return (
    <Card>
      <CardImage source={{uri: itemToDisplay.image}} resizeMode={'cover'} />
      <DetailsContainer>
        <Title>{item?.description}</Title>

        <Space x2 />

        <Title>{t('items.price', {price: item?.price})}</Title>

        <Space x2 />

        <TouchableOpacity
          onPress={onBuy}
          hitSlop={theme.dimension.hitSlop.default}>
          <Action>{t('items.shopNow')}</Action>
        </TouchableOpacity>
      </DetailsContainer>
    </Card>
  );
};

const Card = styled(Screen)(() => ({
  alignItems: 'center',
}));
const CardImage = styled(FastImage)(({theme}) => ({
  width: theme.dimension.window.width,
  height: theme.dimension.window.width,
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
