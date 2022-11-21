import React, {useCallback} from 'react';
import {FlatList, FlatListProps, ListRenderItem} from 'react-native';
import styled from '@emotion/native';

import {ItemCard} from '$features/items/components/ItemCard';
import {Item, ItemGeneric} from '$features/items/itemsTypes';

const keyExtractor: FlatListProps<Item>['keyExtractor'] = (item: Item) =>
  `${item.id}`;

interface ItemListProps {
  data: ItemGeneric[];
  refreshing: boolean;
  onRefresh: () => void;
  onSelectItem: (itemId: ItemGeneric['id']) => void;
  onBuyItem: (item: ItemGeneric) => void;
  onLikeItem: (itemId: ItemGeneric['id']) => void;
  getIsFavourite: (itemId: ItemGeneric['id']) => boolean;
}

export const ItemList = ({
  data,
  onBuyItem,
  onLikeItem,
  onSelectItem,
  getIsFavourite,
  ...listProps
}: ItemListProps) => {
  const renderItem: ListRenderItem<ItemGeneric> = useCallback(
    ({item, index}) => (
      <ItemCard
        {...item}
        onLike={onLikeItem}
        onBuy={onBuyItem}
        onSelect={onSelectItem}
        separated={index % 2 === 0}
        isFavourite={getIsFavourite(item.id)}
      />
    ),
    [onLikeItem, onBuyItem, onSelectItem, getIsFavourite],
  );

  return (
    <SeparatedList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      horizontal={false}
      {...listProps}
    />
  );
};

const SeparatedList = styled(FlatList<ItemGeneric>)(({theme}) => ({
  padding: theme.size.x2,
}));
