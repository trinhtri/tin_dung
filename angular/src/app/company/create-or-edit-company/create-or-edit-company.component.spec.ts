import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditCompanyComponent } from './create-or-edit-company.component';

describe('CreateOrEditCompanyComponent', () => {
  let component: CreateOrEditCompanyComponent;
  let fixture: ComponentFixture<CreateOrEditCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
