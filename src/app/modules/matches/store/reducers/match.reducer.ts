import { createReducer, on, Action } from "@ngrx/store";

// Actions
import {
  matchRequested,
  matchLoaded,
  matchError,
} from "src/app/modules/matches/store/actions/match.actions";

// Models
import { MatchInformation } from "src/app/modules/matches/models/match.model";

export const matchesFeatureKey = "matches";

export interface MatchState {
  matchInformation?: MatchInformation;
  matchState: {
    loading: boolean;
    loaded: boolean;
    error: boolean;
  };
}

export const initialState: MatchState = {
  matchInformation: null,
  matchState: {
    loading: false,
    loaded: false,
    error: false,
  },
};

const MatchesReducer = createReducer(
  initialState,
  on(matchRequested, (state) => {
    return {
      ...state,
      matchInformation: null,
      matchState: { loading: true, loaded: false, error: false },
    };
  }),
  on(matchLoaded, (state, { matchInformation }) => {
    return {
      ...state,
      matchInformation,
      matchState: { loading: false, loaded: true, error: false },
    };
  }),
  on(matchError, (state) => {
    return {
      ...state,
      matchInformation: null,
      matchState: { loading: false, loaded: false, error: true },
    };
  })
);

export function reducer(state: MatchState | undefined, action: Action) {
  return MatchesReducer(state, action);
}
