import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

// Component
import { ErrorPopupComponent } from "src/app/modules/matches/components/error-popup/error-popup.component";

xdescribe("ErrorPopupComponent", () => {
  let component: ErrorPopupComponent;
  let fixture: ComponentFixture<ErrorPopupComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ErrorPopupComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
