import { createAction, props } from "@ngrx/store";

// Models
import { MatchInformation } from "src/app/modules/matches/models/match.model";

export enum MatchActionTypes {
  MatchRequested = "[Match Service] Match Requested",
  MatchLoaded = "[Match Service API] Match Loaded",
  MatchError = "[Match Service API] Match Error",
  MatchCloseModal = "[Match Service API] Match Close Modal",
}

// Match
export const matchRequested = createAction(MatchActionTypes.MatchRequested);
export const matchLoaded = createAction(
  MatchActionTypes.MatchLoaded,
  props<{ matchInformation: MatchInformation }>()
);
export const matchError = createAction(MatchActionTypes.MatchError);
export const matchCloseModal = createAction(MatchActionTypes.MatchCloseModal);
