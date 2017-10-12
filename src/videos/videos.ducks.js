// import { fork, takeEvery } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';
import update from 'immutability-helper';

import { createTypes } from '../utils';

export const VIDEOS = createTypes('VIDEOS', [
  'SELECT',
]);

export const selectVideo = createAction(VIDEOS.SELECT);

// Reducers
const initialState = {
  selected: null,
  loading: false,
  error: null,
};

export default handleActions({
  [VIDEOS.SELECT]: (state, action) => update(state, {
    selected: { $set: action.payload },
  }),
}, initialState);

// Selectors
export const getSelectedVideo = state => state.teams.selected;

// Sagas
// function * fetchTeamVideosHandler() {
//   try {
//     yield console.log('moi');
//   } catch (error) {
//     yield console.error('Error in fetchProgramHandler', error);
//   }
// }

// function * watchFetchTeamVideos() {
//   yield* takeEvery(VIDEOS.SELECT, fetchTeamVideosHandler);
// }

// export function * teamsSagas() {
//   yield fork(watchFetchTeamVideos);
// }
