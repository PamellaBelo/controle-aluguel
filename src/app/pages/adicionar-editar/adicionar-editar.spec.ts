import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarEditar } from './adicionar-editar';

describe('AdicionarEditar', () => {
  let component: AdicionarEditar;
  let fixture: ComponentFixture<AdicionarEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarEditar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
