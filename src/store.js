import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import teams from './teams/teams.ducks';
import videos, { videosSagas } from './videos/videos.ducks';
import initReducer, { initSagas } from './init/init.ducks';

const rootReducer = combineReducers({
  teams,
  videos,
  init: initReducer,
});

function* rootSaga() {
  // yield fork(teamsSagas);
  yield fork(videosSagas);
  yield fork(initSagas);
}

const sagaMiddleware = createSagaMiddleware();
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(sagaMiddleware);
} else {
  const logger = require('redux-logger').default; // eslint-disable-line

  enhancer = !window.devToolsExtension
    ? applyMiddleware(sagaMiddleware, logger)
    : compose(
      applyMiddleware(sagaMiddleware, logger),
      window.devToolsExtension()
    );
}


export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
