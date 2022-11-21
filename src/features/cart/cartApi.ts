import {ItemGeneric} from '$features/items/itemsTypes';

import {commonApi} from '$services/commonApi';

import {CartItem} from './cartTypes';

export const bagsApi = commonApi.injectEndpoints({
  endpoints: build => ({
    getCartItems: build.query<CartItem[], void>({
      query: () => '/cart',
    }),

    addItemToCart: build.mutation<void, ItemGeneric>({
      query: ({id}) => ({
        url: '/cart',
        method: 'POST',
        body: {
          id,
          quantity: 1,
        },
      }),
      async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          (commonApi as typeof bagsApi).util.updateQueryData(
            'getCartItems',
            undefined,
            (draft: CartItem[]) => {
              const createdCartItem = draft.find(
                cartItem => cartItem.item_id === id,
              );

              if (createdCartItem) {
                createdCartItem.quantity++;
              } else {
                draft.push({...patch, item_id: id, quantity: 1});
              }

              return draft;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    removeItemFromCart: build.mutation<void, ItemGeneric['id']>({
      query: id => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          (commonApi as typeof bagsApi).util.updateQueryData(
            'getCartItems',
            undefined,
            (draft: CartItem[]) => {
              return draft.filter(cartItem => cartItem.item_id !== id);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    resetCart: build.mutation<void, void>({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          (commonApi as typeof bagsApi).util.updateQueryData(
            'getCartItems',
            undefined,
            () => [],
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateItemInCart: build.mutation<void, CartItem>({
      query: ({item_id, quantity}) => ({
        url: `/cart/${item_id}`,
        method: 'PUT',
        body: {
          quantity,
        },
      }),
      async onQueryStarted({item_id, ...patch}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          (commonApi as typeof bagsApi).util.updateQueryData(
            'getCartItems',
            undefined,
            (draft: CartItem[]) => {
              const createdCartItem = draft.find(
                cartItem => cartItem.item_id === item_id,
              );

              if (createdCartItem) {
                createdCartItem.quantity = patch.quantity;
              }

              return draft;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useAddItemToCartMutation,
  useGetCartItemsQuery,
  useRemoveItemFromCartMutation,
  useResetCartMutation,
  useUpdateItemInCartMutation,
} = bagsApi;
