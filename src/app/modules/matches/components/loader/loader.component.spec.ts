import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockStore } from "@ngrx/store/testing";

// Component
import { LoaderComponent } from "src/app/modules/matches/components/loader/loader.component";

xdescribe("LoaderComponent", () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
