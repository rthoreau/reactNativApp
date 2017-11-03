import React from 'react';
import { Provider } from 'react-redux';
import RootNavigator from './navigators/RootNavigator';
import store from './store';

const AppProvider = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default AppProvider;
