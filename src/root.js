import React from 'react';
import { Provider } from 'react-redux';
import withAPIs from './init/withAPIs';
import App from './app';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default withAPIs(Root);
