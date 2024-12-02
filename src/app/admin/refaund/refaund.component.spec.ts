import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefaundComponent } from './refaund.component';

describe('RefaundComponent', () => {
  let component: RefaundComponent;
  let fixture: ComponentFixture<RefaundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefaundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefaundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
