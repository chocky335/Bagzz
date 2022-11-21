import {commonApi} from '$services/commonApi';

import {ItemGeneric, ItemWithDetails} from './itemsTypes';

export const bagsApi = commonApi.injectEndpoints({
  endpoints: build => ({
    fetchItemList: build.query<ItemGeneric[], void>({
      query: () => '/items',
    }),
  }),
});

export const {useFetchItemListQuery} = bagsApi;
