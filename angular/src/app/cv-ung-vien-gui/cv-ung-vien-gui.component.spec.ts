import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVUngVienGuiComponent } from './cv-ung-vien-gui.component';

describe('CVUngVienGuiComponent', () => {
  let component: CVUngVienGuiComponent;
  let fixture: ComponentFixture<CVUngVienGuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVUngVienGuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVUngVienGuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
