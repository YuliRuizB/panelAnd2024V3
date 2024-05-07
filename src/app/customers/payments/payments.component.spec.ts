import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsComponents } from './payments.component';

describe('PaymentsComponent', () => {
  let component: PaymentsComponents;
  let fixture: ComponentFixture<PaymentsComponents>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsComponents ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
