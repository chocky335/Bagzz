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

export const FavouritesScreen: React.FC<MainTabsProps<'Favourites'>> = ({
  navigation,
}) => {
  const favouriteIds = useAppSelector(selectFavouriteIds);
  const dispatch = useAppDispatch();
  const [addItemToCartMutation] = useAddItemToCartMutation();
  const {data = [], isLoading, refetch} = useFetchItemListQuery();
  const favourites = data.filter(({id}) => favouriteIds.includes(id));
  const onLikeItem = useCallback(
    (itemId: ItemId) => dispatch(toggleFavorite(itemId)),
    [dispatch],
  );
  const onBuyItem = useCallback(
    (item: ItemGeneric) => addItemToCartMutation(item),
    [addItemToCartMutation],
  );
  const getIsFavourite = useCallback(
    (itemId: ItemId) => favouriteIds.includes(itemId),
    [favouriteIds],
  );
  const onSelectItem = useCallback(
    (itemId: ItemId) => {
      navigation.navigate('ItemDetails', {itemId});
    },
    [navigation],
  );

  return (
    <Screen insetTop>
      <ItemList
        data={favourites}
        refreshing={isLoading}
        onRefresh={refetch}
        onLikeItem={onLikeItem}
        onBuyItem={onBuyItem}
        onSelectItem={onSelectItem}
        getIsFavourite={getIsFavourite}
      />
    </Screen>
  );
};
