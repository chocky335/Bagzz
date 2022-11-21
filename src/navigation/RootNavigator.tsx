import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {MainStackNavigator} from './MainStackNavigator';

export function RootNavigator() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
