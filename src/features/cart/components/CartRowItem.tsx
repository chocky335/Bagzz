import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from '@emotion/react';
import styled from '@emotion/native';

import {Text} from '$src/kit/components';

import {CartItem, CartItemId} from '$features/cart/cartTypes';

import {IonIcon, Row, Space} from '$kit/components';

type CartRowItemProps = CartItem & {
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onSelect: (itemId: CartItemId) => void;
};

export const CartRowItem = ({
  onAdd,
  onRemove,
  onSelect,
  ...item
}: CartRowItemProps) => {
  const {t} = useTranslation();
  const {image, name, item_id, quantity, price} = item;
  const onAddItem = useCallback(() => onAdd(item), [item, onAdd]);
  const onRemoveItem = useCallback(() => onRemove(item), [item, onRemove]);
  const onResetItem = useCallback(
    () => onRemove({...item, quantity: 1}),
    [item, onRemove],
  );
  const onSelectItem = useCallback(
    () => onSelect(item_id),
    [item_id, onSelect],
  );

  const {size, dimension} = useTheme();

  return (
    <Card onPress={onSelectItem}>
      <CardImage source={{uri: image}} resizeMode={'cover'} />

      <DetailsContainer>
        <Title>{name}</Title>

        <Space x1 flexible />

        <Price>{t('items.price', {price})}</Price>
        <Total>{t('cart.total', {total: price * quantity})}</Total>
        <Row centered>
          <TouchableOpacity
            onPress={onAddItem}
            hitSlop={{...dimension.hitSlop.default, right: 0}}>
            <IonIcon size={size.x4} name={'add'} />
          </TouchableOpacity>

          <Quantity>{quantity}</Quantity>

          <TouchableOpacity
            onPress={onRemoveItem}
            hitSlop={{...dimension.hitSlop.default, left: 0}}>
            <IonIcon size={size.x4} name={'remove'} />
          </TouchableOpacity>
        </Row>
      </DetailsContainer>

      <RemoveAction onPress={onResetItem} hitSlop={dimension.hitSlop.default}>
        <IonIcon size={size.x4} name={'close-outline'} />
      </RemoveAction>
    </Card>
  );
};

const Card = styled.TouchableOpacity(({theme}) => ({
  backgroundColor: theme.color.card,
  flex: 1,
  flexDirection: 'row',
  marginHorizontal: theme.size.x2,
  borderRadius: theme.size.x1,
  overflow: 'hidden',
}));
const CardImage = styled(FastImage)(({theme}) => ({
  width: theme.size.x10,
  heigth: theme.size.x10,
}));
const DetailsContainer = styled.View(({theme}) => ({
  paddingTop: theme.size.x1,
  paddingLeft: theme.size.x1,
}));
const Title = styled(Text)(() => ({}));
const Price = styled(Text)(() => ({}));
const Total = styled(Text)(() => ({
  textDecorationStyle: 'solid',
  textDecorationLine: 'underline',
  fontWeight: 'bold',
}));
const Quantity = styled(Text)(() => ({
  fontWeight: 'bold',
}));
const RemoveAction = styled.TouchableOpacity(() => ({
  position: 'absolute',
  right: 0,
  top: 0,
}));
