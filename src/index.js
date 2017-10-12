import 'babel-polyfill'; // emulate ES6 features

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
// import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(<Component store={store} />, rootElement);
};

let Root;

if (process.env.NODE_ENV === 'production') {
  Root = require('./root').default; // eslint-disable-line
  ReactDOM.render(<Root store={store} />, rootElement);
} else {
  Root = require('./root').default; // eslint-disable-line

  renderApp(Root);

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept('./root', () => {
      const NextApp = require('./root').default; // eslint-disable-line
      renderApp(NextApp);
    });
  }
}

// registerServiceWorker();
