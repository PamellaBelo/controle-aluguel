import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoDespesas } from './gestao-despesas';

describe('GestaoDespesas', () => {
  let component: GestaoDespesas;
  let fixture: ComponentFixture<GestaoDespesas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestaoDespesas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoDespesas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
