import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesNewComponents } from './new.component';

describe('NewComponent', () => {
  let component: RoutesNewComponents;
  let fixture: ComponentFixture<RoutesNewComponents>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesNewComponents ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesNewComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
