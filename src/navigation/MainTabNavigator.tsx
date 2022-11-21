import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {CartListScreen} from '$features/cart/screens/CartListScreen';
import {FavouritesScreen} from '$features/favourites/screens/FavouritesScreen';
import {ItemListScreen} from '$features/items/screens/ItemListScreen';

import {MainTabBar} from './components/MainTabBar';

const Tab = createBottomTabNavigator();
const MainTabNavigatorOptions = {
  headerShown: false,
};

const createTabBar = (props: BottomTabBarProps) => <MainTabBar {...props} />;
export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={MainTabNavigatorOptions}
      tabBar={createTabBar}>
      <Tab.Screen name="Dashboard" component={ItemListScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="Cart" component={CartListScreen} />
    </Tab.Navigator>
  );
}
