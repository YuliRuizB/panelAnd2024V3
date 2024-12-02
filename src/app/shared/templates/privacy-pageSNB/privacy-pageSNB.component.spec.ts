import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPageComponentSNB } from './privacy-pageSNB.component';

describe('PrivacyPageComponent', () => {
  let component: PrivacyPageComponentSNB;
  let fixture: ComponentFixture<PrivacyPageComponentSNB>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyPageComponentSNB ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPageComponentSNB);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
