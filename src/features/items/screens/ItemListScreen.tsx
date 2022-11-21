import React, {useCallback} from 'react';

import {useAddItemToCartMutation} from '$features/cart/cartApi';
import {selectFavouriteIds} from '$features/favourites/favouritesSelectors';
import {toggleFavorite} from '$features/favourites/favouritesSlice';
import {ItemList} from '$features/items/components/ItemList';
import {useFetchItemListQuery} from '$features/items/itemsApi';
import {ItemGeneric, ItemId} from '$features/items/itemsTypes';

import {Screen} from '$kit/components';

import {MainTabsProps} from '$navigation/types';

import {useAppDispatch, useAppSelector} from '$store/storeHooks';

export const ItemListScreen: React.FC<MainTabsProps<'Dashboard'>> = ({
  navigation,
}) => {
  const favouriteIds = useAppSelector(selectFavouriteIds);
  const dispatch = useAppDispatch();
  const [addItemToCartMutation] = useAddItemToCartMutation();
  const {data = [], isLoading, refetch} = useFetchItemListQuery();
  const onLikeItem = useCallback(
    (itemId: ItemId) => dispatch(toggleFavorite(itemId)),
    [dispatch],
  );
  const onBuyItem = useCallback(
    (item: ItemGeneric) => addItemToCartMutation(item),
    [addItemToCartMutation],
  );
  const onSelectItem = useCallback(
    (itemId: ItemId) => navigation.navigate('ItemDetails', {itemId}),
    [navigation],
  );

  return (
    <Screen insetTop>
      <ItemList
        data={data}
        refreshing={isLoading}
        onRefresh={refetch}
        onLikeItem={onLikeItem}
        onBuyItem={onBuyItem}
        onSelectItem={onSelectItem}
        getIsFavourite={itemId => favouriteIds.includes(itemId)}
      />
    </Screen>
  );
};
