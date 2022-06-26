import { ActionReducerMap, MetaReducer, ActionReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { routerReducer } from "@ngrx/router-store";
import { InjectionToken } from "@angular/core";

// tslint:disable-next-line: no-empty-interface
export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export function log(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export function reset(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = environment.production ? [reset] : [reset, log];

export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<AppState>>("App Reducers");
export const reducerProvider = { provide: REDUCERS_TOKEN, useValue: reducers };
