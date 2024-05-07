import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseVerifyEmailComponent } from './please-verify-email.component';

describe('PleaseVerifyEmailComponent', () => {
  let component: PleaseVerifyEmailComponent;
  let fixture: ComponentFixture<PleaseVerifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PleaseVerifyEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PleaseVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
