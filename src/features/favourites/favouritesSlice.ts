import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Item} from '$features/items/itemsTypes';

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: [] as Array<Item['id']>,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Item['id']>) {
      const itemId = action.payload;

      if (state.includes(itemId)) {
        return state.filter(id => id !== itemId);
      } else {
        state.push(itemId);
      }
    },
  },
});

export const {toggleFavorite} = favouritesSlice.actions;

export default favouritesSlice.reducer;
