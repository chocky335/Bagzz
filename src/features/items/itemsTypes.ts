export interface ItemGeneric {
  id: number;
  price: number;
  name: string;
  image: string;
}

export interface ItemWithDetails extends ItemGeneric {
  description: string;
}

export type Item = ItemGeneric | ItemWithDetails;

export type ItemId = Item['id'];
