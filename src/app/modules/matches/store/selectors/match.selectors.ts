import { createSelector, createFeatureSelector } from "@ngrx/store";

// Reducer
import { matchesFeatureKey, MatchState } from "src/app/modules/matches/store/reducers/match.reducer";

const selectMatchState = createFeatureSelector<MatchState>(matchesFeatureKey);

// Selectors
export const selectMatches = createSelector(selectMatchState, (state: MatchState) => {
  return {
    ...state.matchState,
    matchInformation: state.matchInformation
  };
});
