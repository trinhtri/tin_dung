import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditCVComponent } from './create-or-edit-cv.component';

describe('CreateOrEditCVComponent', () => {
  let component: CreateOrEditCVComponent;
  let fixture: ComponentFixture<CreateOrEditCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditCVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
