import React, {useCallback} from 'react';

import {
  useGetCartItemsQuery,
  useRemoveItemFromCartMutation,
  useResetCartMutation,
  useUpdateItemInCartMutation,
} from '$features/cart/cartApi';
import {CartItem} from '$features/cart/cartTypes';
import {CartList} from '$features/cart/components/CartList';

import {Screen} from '$kit/components';

import {MainTabsProps} from '$navigation/types';
import {ItemId} from '$src/features/items/itemsTypes';

export const CartListScreen = ({navigation}: MainTabsProps<'Cart'>) => {
  const {data = [], isLoading, refetch} = useGetCartItemsQuery();

  const [updateItemInCartMutation] = useUpdateItemInCartMutation();
  const [resetCartMutation] = useResetCartMutation();
  const [removeItemFromCartMutation] = useRemoveItemFromCartMutation();

  const onAddCart = useCallback(
    (item: CartItem) =>
      updateItemInCartMutation({...item, quantity: item.quantity + 1}),
    [updateItemInCartMutation],
  );
  const onRemoveCart = useCallback(
    (item: CartItem) => {
      const nextQuantity = item.quantity - 1;
      if (nextQuantity === 0) {
        removeItemFromCartMutation(item.item_id);
      } else {
        updateItemInCartMutation({...item, quantity: nextQuantity});
      }
    },
    [removeItemFromCartMutation, updateItemInCartMutation],
  );
  const onResetCart = useCallback(
    () => resetCartMutation(),
    [resetCartMutation],
  );
  const onSelectCartItem = useCallback(
    (itemId: ItemId) => {
      navigation.navigate('ItemDetails', {itemId});
    },
    [navigation],
  );

  return (
    <Screen insetTop>
      <CartList
        data={data}
        refreshing={isLoading}
        onRefresh={refetch}
        onAddCart={onAddCart}
        onRemoveCart={onRemoveCart}
        onResetCart={onResetCart}
        onSelectCartItem={onSelectCartItem}
      />
    </Screen>
  );
};
