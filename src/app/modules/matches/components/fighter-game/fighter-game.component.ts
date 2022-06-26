import { trigger, keyframes, animate, transition } from "@angular/animations";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

// Actions
import { matchRequested } from "src/app/modules/matches/store/actions/match.actions";

// Key frames
import * as kf from "src/app/modules/matches/animations/keyframes";

// Models
import {
  MatchInformation,
  Match,
} from "src/app/modules/matches/models/match.model";

// Reducers
import { AppState } from "src/app/store/reducers";

// Selectors
import { selectMatches } from "src/app/modules/matches/store/selectors/match.selectors";

@Component({
  selector: "fighter-game",
  templateUrl: "./fighter-game.component.html",
  styleUrls: ["./fighter-game.component.scss"],
  animations: [
    trigger("cardAnimator", [
      transition(
        "* => slideOutLeft",
        animate(1000, keyframes(kf.slideOutLeft))
      ),
      transition(
        "* => slideOutRight",
        animate(1000, keyframes(kf.slideOutRight))
      ),
    ]),
  ],
})
export class FighterGameCardComponent {
  animationState: string;

  matchInformation: MatchInformation;

  selected: Match = null;

  showMobile: boolean = false;
  loading: boolean = false;
  error: boolean = false;

  subscription: Subscription[];

  currentPosition: number = 0;
  totalCount: number = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(matchRequested());

    this.subscription = [
      this.breakpointObserver
        .observe(["(max-width: 766px)"])
        .subscribe((result: BreakpointState) => {
          this.showMobile = result.matches;
        }),

      this.store
        .select(selectMatches)
        .subscribe(
          (value: {
            matchInformation: MatchInformation;
            loading: boolean;
            loaded: boolean;
            error: boolean;
          }) => {
            if (value) {
              if (value.loaded) {
                this.matchInformation = value.matchInformation;
                
                this.currentPosition = 0;
                this.selected =
                  this.matchInformation.matches.length > 0
                    ? this.matchInformation.matches[this.currentPosition]
                    : null;
                    
                this.totalCount = this.matchInformation.matches.length;
              }
              
              this.error = value.error;
              this.loading = value.loading;
            }
          }
        ),
    ];
  }

  ngOnDestroy(): void {
    this.subscription.forEach((value: Subscription) => value.unsubscribe());
  }

  onSelection(match: Match) {
    this.selected = match;
  }

  startAnimation(state: string): void {
    if (this.showMobile) {
      if (!this.animationState) {
        this.animationState = state;

        if (this.animationState == "slideOutLeft") {
          this.selected = this.getPreviousValue();
        } else if (this.animationState == "slideOutRight") {
          this.selected = this.getNextValue();
        }
      }
    }
  }

  resetAnimationState(): void {
    this.animationState = "";
  }

  getPreviousValue(): Match {
    if (this.currentPosition == 0) {
      this.currentPosition = this.totalCount - 1;
    } else {
      this.currentPosition--;
    }

    return this.totalCount > 0
      ? this.matchInformation.matches[this.currentPosition]
      : null;
  }

  getNextValue(): Match {
    if (this.currentPosition == this.totalCount - 1) {
      this.currentPosition = 0;
    } else {
      this.currentPosition++;
    }

    return this.totalCount > 0
      ? this.matchInformation.matches[this.currentPosition]
      : null;
  }
}
