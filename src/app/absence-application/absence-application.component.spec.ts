import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceApplicationComponent } from './absence-application.component';

describe('AbsenceApplicationComponent', () => {
  let component: AbsenceApplicationComponent;
  let fixture: ComponentFixture<AbsenceApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceApplicationComponent]
    });
    fixture = TestBed.createComponent(AbsenceApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
