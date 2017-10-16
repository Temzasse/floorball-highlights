import { fork, takeLatest, put } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';
import update from 'immutability-helper';
import { TEAMS, getSelectedTeamId, getTeamsById } from '../teams/teams.ducks';
import {
  getYoutubeSearchApi,
  normalizeYoutubeResults,
} from '../services/utils';

import { createTypes } from '../utils';

export const VIDEOS = createTypes('VIDEOS', [
  'SELECT', 'RECEIVE', 'TOGGLE_ACTIVE'
]);

export const selectVideo = createAction(VIDEOS.SELECT);
export const receiveVideos = createAction(VIDEOS.RECEIVE);
export const toggleActiveStatus = createAction(VIDEOS.TOGGLE_ACTIVE);

// Reducers
const initialState = {
  selected: null,
  byTeam: {}, // videos by team name
  loading: false,
  error: null,
  videoActive: false, // for mobile video modal
};

export default handleActions({
  [VIDEOS.SELECT]: (state, action) => update(state, {
    selected: { $set: action.payload },
    videoActive: { $set: true },
  }),
  [VIDEOS.RECEIVE]: (state, action) => update(state, {
    byTeam: { [action.payload.team.id]: { $set: action.payload.videos } },
  }),
  [VIDEOS.TOGGLE_ACTIVE]: state => update(state, {
    videoActive: { $set: false },
  }),
}, initialState);

// Selectors
export const getSelectedVideo = state => state.videos.selected;
export const getVideosByTeams = state => state.videos.byTeam;
export const getVideoActiveStatus = state => state.videos.videoActive;
export const getVideosBySelectedTeam = state => {
  const selectedTeam = getSelectedTeamId(state);
  const videosByTeam = getVideosByTeams(state);
  return videosByTeam[selectedTeam] || [];
};
export const getSelectedVideoTeam = state => {
  const teams = getTeamsById(state);
  const video = getSelectedVideo(state);
  return video ? teams[video.team.id] : {};
};

// Sagas
function * fetchTeamVideosHandler({ payload: team }) {
  try {
    const yt = getYoutubeSearchApi();
    const { result } = yield yt.search.list({
      channelId: team.channelId,
      part: 'snippet',
      maxResults: 20,
      order: 'date',
    });
    yield put(receiveVideos({
      team,
      videos: normalizeYoutubeResults(result, team),
    }));
  } catch (error) {
    console.log('Error in fetchTeamVideosHandler', error);
  }
}

function * watchSelectTeam() {
  yield takeLatest(TEAMS.SELECT, fetchTeamVideosHandler);
}

export function * videosSagas() {
  yield fork(watchSelectTeam);
}
