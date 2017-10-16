import { fork, takeEvery } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';
import update from 'immutability-helper';

import { createTypes } from '../utils';
import teamsData from './teams.json';

export const TEAMS = createTypes('TEAMS', [
  'SELECT', 'TOGGLE_DETAILS'
]);

export const selectTeam = createAction(TEAMS.SELECT);
export const toggleTeamDetails = createAction(TEAMS.TOGGLE_DETAILS);

// Reducers
const initialState = {
  byId: teamsData,
  selected: null,
  loading: false,
  error: null,
  detailsVisible: false,
};

export default handleActions({
  [TEAMS.SELECT]: (state, action) => update(state, {
    selected: { $set: action.payload.id },
    detailsVisible: { $set: false },
  }),
  [TEAMS.TOGGLE_DETAILS]: state => update(state, {
    detailsVisible: { $set: !state.detailsVisible },
  }),
}, initialState);

// Selectors
export const getSelectedTeamId = state => state.teams.selected;
export const getTeams = state => Object.values(state.teams.byId);
export const getTeamsById = state => state.teams.byId;
export const getDetailsVisibility = state => state.teams.detailsVisible;
export const getSelectedTeam = state => {
  return state.teams.byId[state.teams.selected];
};

// Sagas
function * foo() {
  yield console.log('FOOOO');
}

function * watchFoo() {
  yield takeEvery(TEAMS.TOGGLE_DETAILS, foo);
}

export function * teamsSagas() {
  yield fork(watchFoo);
}
