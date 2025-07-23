import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditar } from './cadastrar-editar';

describe('CadastrarEditar', () => {
  let component: CadastrarEditar;
  let fixture: ComponentFixture<CadastrarEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
