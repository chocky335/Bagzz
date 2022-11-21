import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import '$i18n/i18n';

import {RootNavigator} from '$navigation/RootNavigator';

import {persistor, store} from '$store/store';

import ThemeWrapper from '$theme/components/ThemeWrapper';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeWrapper>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </ThemeWrapper>
    </SafeAreaProvider>
  );
};

export default App;
