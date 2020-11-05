import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgonNguComponent } from './ngon-ngu.component';

describe('NgonNguComponent', () => {
  let component: NgonNguComponent;
  let fixture: ComponentFixture<NgonNguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgonNguComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgonNguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
