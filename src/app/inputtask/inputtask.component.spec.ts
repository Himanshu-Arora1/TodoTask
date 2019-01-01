import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputtaskComponent } from './inputtask.component';

describe('InputtaskComponent', () => {
  let component: InputtaskComponent;
  let fixture: ComponentFixture<InputtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
