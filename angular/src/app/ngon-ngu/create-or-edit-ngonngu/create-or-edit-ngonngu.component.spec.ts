import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditNgonnguComponent } from './create-or-edit-ngonngu.component';

describe('CreateOrEditNgonnguComponent', () => {
  let component: CreateOrEditNgonnguComponent;
  let fixture: ComponentFixture<CreateOrEditNgonnguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditNgonnguComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditNgonnguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
