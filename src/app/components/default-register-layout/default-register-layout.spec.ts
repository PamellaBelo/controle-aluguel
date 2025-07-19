import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultRegisterLayout } from './default-register-layout';

describe('DefaultRegisterLayout', () => {
  let component: DefaultRegisterLayout;
  let fixture: ComponentFixture<DefaultRegisterLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultRegisterLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultRegisterLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
