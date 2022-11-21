import {commonApi} from '$services/commonApi';

import {ItemGeneric, ItemWithDetails} from './itemsTypes';

export const bagsApi = commonApi.injectEndpoints({
  endpoints: build => ({
    fetchItemList: build.query<ItemGeneric[], void>({
      query: () => '/items',
    }),
    fetchItemDetails: build.query<ItemWithDetails, ItemWithDetails['id']>({
      query: id => `/items/${id}`,
    }),
  }),
});

export const {useFetchItemDetailsQuery, useFetchItemListQuery} = bagsApi;
