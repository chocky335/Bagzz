import React, {useCallback} from 'react';
import {FlatList, FlatListProps, ListRenderItem} from 'react-native';

import {CartItem, CartItemId} from '$features/cart/cartTypes';

import {Space} from '$kit/components';

import {CartRowItem} from './CartRowItem';
import {ClearCartButton} from './ClearCartButton';

const keyExtractor: FlatListProps<CartItem>['keyExtractor'] = item =>
  `${item.item_id}`;

interface CartListProps {
  data: CartItem[];
  refreshing: boolean;
  onRefresh: () => void;
  onAddCart: (item: CartItem) => void;
  onRemoveCart: (item: CartItem) => void;
  onResetCart: () => void;
  onSelectCartItem: (itemId: CartItemId) => void;
}

export const CartList = ({
  data,
  onAddCart,
  onRemoveCart,
  onResetCart,
  onSelectCartItem,
  ...listProps
}: CartListProps) => {
  const renderCart: ListRenderItem<CartItem> = useCallback(
    ({item}) => (
      <CartRowItem
        {...item}
        onAdd={onAddCart}
        onRemove={onRemoveCart}
        onSelect={onSelectCartItem}
      />
    ),
    [onAddCart, onRemoveCart, onSelectCartItem],
  );

  return (
    <FlatList<CartItem>
      data={data}
      renderItem={renderCart}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => <Space x1 />}
      ListFooterComponent={
        <ClearCartButton dataLength={data.length} onResetCart={onResetCart} />
      }
      {...listProps}
    />
  );
};
