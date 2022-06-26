import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "@angular/cdk/layout";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";

// Components
import { AppComponent } from "src/app/app.component";

// Environments
import { environment } from "src/environments/environment";

// Modules
import { MatchesModule } from "src/app/modules/matches/matches.module";

// Reducers
import {
  reducerProvider,
  REDUCERS_TOKEN,
  metaReducers,
} from "src/app/store/reducers";

// Hammer JS Configurations
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import * as Hammer from "hammerjs";

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    // override hammerjs default configuration
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    EffectsModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    LayoutModule,
    StoreModule.forRoot(REDUCERS_TOKEN, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MatchesModule,
    HammerModule,
  ],
  providers: [
    reducerProvider,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
