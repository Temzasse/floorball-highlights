import { fork, takeLatest, put, select } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';
import update from 'immutability-helper';
import { TEAMS, getSelectedTeamId, getTeamsById } from '../teams/teams.ducks';
import {
  getYoutubeSearchApi,
  normalizeYoutubeResults,
  filterVideos,
  updateSettings,
} from '../services/utils';

import { createTypes } from '../utils';

export const VIDEOS = createTypes('VIDEOS', [
  'SELECT', 'RECEIVE', 'DISABLE_ACTIVE', 'TOGGLE_FILTER', 'SET_FILTER'
]);

export const selectVideo = createAction(VIDEOS.SELECT);
export const receiveVideos = createAction(VIDEOS.RECEIVE);
export const disableActiveStatus = createAction(VIDEOS.DISABLE_ACTIVE);
export const toggleFiltering = createAction(VIDEOS.TOGGLE_FILTER);
export const setFiltering = createAction(VIDEOS.SET_FILTER);

// Reducers
const initialState = {
  selected: null,
  byTeam: {}, // videos by team name
  loading: false,
  error: null,
  videoActive: false, // for mobile video modal
  filtering: false,
};

export default handleActions({
  [VIDEOS.SELECT]: (state, action) => update(state, {
    selected: { $set: action.payload },
    videoActive: { $set: true },
  }),
  [VIDEOS.RECEIVE]: (state, action) => update(state, {
    byTeam: { [action.payload.team.id]: { $set: action.payload.videos } },
  }),
  [VIDEOS.DISABLE_ACTIVE]: state => update(state, {
    videoActive: { $set: false },
  }),
  [VIDEOS.TOGGLE_FILTER]: state => update(state, {
    filtering: { $set: !state.filtering },
  }),
  [VIDEOS.SET_FILTER]: (state, action) => update(state, {
    filtering: { $set: !!action.payload },
  }),
}, initialState);

// Selectors
export const getSelectedVideo = state => state.videos.selected;
export const getVideosByTeams = state => state.videos.byTeam;
export const getVideoActiveStatus = state => state.videos.videoActive;
export const getFilteringStatus = state => state.videos.filtering;
export const getVideosBySelectedTeam = state => {
  const selectedTeam = getSelectedTeamId(state);
  const videosByTeam = getVideosByTeams(state);
  const filtering = getFilteringStatus(state);
  const videos = videosByTeam[selectedTeam] || [];
  return filtering ? filterVideos(videos) : videos;
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
      maxResults: 30,
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

function * filteringHandler() {
  const filtering = yield select(getFilteringStatus);
  yield updateSettings({ filtering });
}

function * watchSelectTeam() {
  yield takeLatest(TEAMS.SELECT, fetchTeamVideosHandler);
}

function * watchFiltering() {
  yield takeLatest(VIDEOS.TOGGLE_FILTER, filteringHandler);
}

export function * videosSagas() {
  yield fork(watchSelectTeam);
  yield fork(watchFiltering);
}
