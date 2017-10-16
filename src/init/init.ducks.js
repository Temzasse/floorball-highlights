import { fork, takeEvery, put } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';
import update from 'immutability-helper';

import { createTypes } from '../utils';
import { setFiltering } from '../videos/videos.ducks';

export const INIT = createTypes('INIT', [
  'START', 'DONE',
]);

export const init = createAction(INIT.START);
export const initDone = createAction(INIT.DONE);

// Reducers
const initialState = {
  initDone: false,
};

export default handleActions({
  [INIT.DONE]: state => update(state, {
    initDone: { $set: true },
  }),
}, initialState);

// Selectors
// export const getFoo = state => state.init.foo;

// Sagas
function * initHandler() {
  const s = yield localStorage.getItem('settings');

  if (s) {
    const settings = JSON.parse(s);
    yield put(setFiltering(settings.filtering));
  }

  yield put(initDone());
}

function * watchInit() {
  yield takeEvery(INIT.START, initHandler);
}

export function * initSagas() {
  yield fork(watchInit);
}
