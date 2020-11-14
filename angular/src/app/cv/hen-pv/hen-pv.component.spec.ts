import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HenPVComponent } from './hen-pv.component';

describe('HenPVComponent', () => {
  let component: HenPVComponent;
  let fixture: ComponentFixture<HenPVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HenPVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HenPVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
