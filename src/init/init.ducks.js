import { all, takeEvery, put } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';
import update from 'immutability-helper';

import { createTypes } from '../utils';
import { setFiltering } from '../videos/videos.ducks';
import { getSettings } from '../services/utils';

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
  const settings = getSettings();
  yield put(setFiltering(settings.filtering));
  yield put(initDone());
}

// function * unwatchedVideosHandler() {
//   const { videoNotifications } = getSettings();

//   if (videoNotifications) {
//     const newNotifications = [];
//     const teams = yield select(getTeams);
//     const mostRecent = yield all(teams.map(({ id }) =>
//       call(fetchMostRecent, id)
//     ));

//     mostRecent.forEach((recent = {}) => {
//       const prevMostRecent = videoNotifications[recent.teamId];
//       if (recent.videoId !== prevMostRecent) {
//         newNotifications.push(recent);
//       }
//     });

//     yield all(newNotifications.map(({ teamId }) =>
//       put(addTeamNotification(teamId))
//     ));
//   }
// }

export function * initSagas() {
  yield all([
    takeEvery(INIT.START, initHandler),
  ]);
}
