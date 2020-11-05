import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendJDComponent } from './send-jd.component';

describe('SendJDComponent', () => {
  let component: SendJDComponent;
  let fixture: ComponentFixture<SendJDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendJDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendJDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
