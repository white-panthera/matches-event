import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";

// Component
import { FighterGameCardComponent } from "src/app/modules/matches/components/fighter-game/fighter-game.component";
import { ErrorPopupComponent } from "src/app/modules/matches/components/error-popup/error-popup.component";
import { LoaderComponent } from "src/app/modules/matches/components/loader/loader.component";

// Effects
import { MatchesEffects } from "src/app/modules/matches/store/effects/match.effects";

// Reducers
import * as fromMatchesReducer from "src/app/modules/matches/store/reducers/match.reducer";

@NgModule({
  declarations: [
    FighterGameCardComponent,
    ErrorPopupComponent,
    LoaderComponent,
  ],
  entryComponents: [
    FighterGameCardComponent,
    ErrorPopupComponent,
    LoaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    FormsModule,
    StoreModule.forFeature(fromMatchesReducer.matchesFeatureKey, fromMatchesReducer.reducer),
    EffectsModule.forFeature([MatchesEffects]),
    HammerModule
  ],
  exports: [
    FighterGameCardComponent,
    ErrorPopupComponent,
    LoaderComponent
  ]
})
export class MatchesModule {}
