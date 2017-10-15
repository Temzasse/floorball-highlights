import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import withAPIs from './init/withAPIs';
import theme from './assets/theme';
import App from './app';

const Root = ({ store }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

export default withAPIs(Root);
