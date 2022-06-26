import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { BrowserModule } from "@angular/platform-browser";

// Actions
import { matchRequested } from "src/app/modules/matches/store/actions/match.actions";

// Component
import { FighterGameCardComponent } from "src/app/modules/matches/components/fighter-game/fighter-game.component";

// Models
import { MatchInformation } from "src/app/modules/matches/models/match.model";

// Reducers
import { AppState } from "src/app/store/reducers";
import { CommonModule } from "@angular/common";

describe("FighterGameCardComponent", () => {
  let component: FighterGameCardComponent;
  let fixture: ComponentFixture<FighterGameCardComponent>;
  let store: MockStore<AppState>;
  const initialState = {};

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
          CommonModule
        ],
        providers: [provideMockStore({ initialState })],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FighterGameCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();

    spyOn(store, "dispatch");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch match requested", () => {
    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(matchRequested());
  });
});
