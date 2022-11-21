export interface CartItem {
  item_id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export type CartItemId = CartItem['item_id'];
