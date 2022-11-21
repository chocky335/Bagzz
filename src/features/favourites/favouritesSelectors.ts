import {RootState} from '$store/store';

export const selectFavouriteIds = (state: RootState) => state.favourites;
