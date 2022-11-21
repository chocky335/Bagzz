import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Item} from '$features/items/itemsTypes';

export type MainStackParamList = {
  MainTabNavigator: undefined;
  ItemDetails: {itemId: Item['id']};
};
export type MainTabsParamList = {
  Dashboard: undefined;
  Favourites: undefined;
  Cart: undefined;
};

export type MainStackProps<StackKey extends keyof MainStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MainStackParamList, StackKey>,
    BottomTabScreenProps<MainTabsParamList, 'Dashboard'>
  >;

export type MainTabsProps<TabKey extends keyof MainTabsParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MainStackParamList>,
    BottomTabScreenProps<MainTabsParamList, TabKey>
  >;
