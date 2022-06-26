import { exhaustMap, map, catchError, switchMap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

// Actions
import {
  matchCloseModal,
  matchRequested,
  matchLoaded,
  matchError,
} from "src/app/modules/matches/store/actions/match.actions";

// Components
import { ErrorPopupComponent } from "src/app/modules/matches/components/error-popup/error-popup.component";

// Models
import { MatchInformation } from "src/app/modules/matches/models/match.model";

// Service
import { MatchesService } from "src/app/modules/matches/services/matches.service";

@Injectable()
export class MatchesEffects {
  constructor(
    private matchesService: MatchesService,
    private actions$: Actions,
    private dialog: MatDialog
  ) {}

  matchRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(matchRequested),
      exhaustMap(() =>
        this.matchesService.getMatches().pipe(
          map((matchInformation: MatchInformation) =>
            matchLoaded({ matchInformation })
          ),
          catchError((errorMessage) => of(matchError()))
        )
      )
    )
  );

  matchError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(matchError),
      switchMap((action) => {
        const dialogRef = this.dialog.open(ErrorPopupComponent, {
          autoFocus: false,
        });
        return dialogRef
          .afterClosed()
          .pipe(map((name: string | undefined) => ({ name })));
      }),
      switchMap((result: { name: string | undefined }) => {
        return of(matchCloseModal());
      })
    )
  );
}
