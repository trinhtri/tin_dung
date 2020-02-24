import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVGuiDiComponent } from './cv-gui-di.component';

describe('CVGuiDiComponent', () => {
  let component: CVGuiDiComponent;
  let fixture: ComponentFixture<CVGuiDiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVGuiDiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVGuiDiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
