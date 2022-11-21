import React, {useMemo} from 'react';
import {useTheme} from '@emotion/react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ItemDetailsTitle} from '$features/items/components/ItemDetailsTitle';
import {ItemDetails} from '$features/items/screens/ItemDetailsScreen';

import {MainTabNavigator} from './MainTabNavigator';
import {MainStackParamList} from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStackNavigator() {
  const {
    color: {header: headerColor, tint: headerTintColor},
  } = useTheme();

  const stackScreenOptions = useMemo(
    () => ({
      headerTitle: ItemDetailsTitle,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: headerColor,
      },
      headerTintColor: headerTintColor,
    }),
    [headerColor, headerTintColor],
  );

  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="MainTabNavigator"
        component={MainTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ItemDetails" component={ItemDetails} />
    </Stack.Navigator>
  );
}
