import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store} from '$store/store';
import {persistor} from '$store/store';

import ThemeWrapper from '$theme/components/ThemeWrapper';

const App = () => {
  return (
    <ThemeWrapper>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {null}
        </PersistGate>
      </Provider>
    </ThemeWrapper>
  );
};

export default App;
