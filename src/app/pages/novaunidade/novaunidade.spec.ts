import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Novaunidade } from './novaunidade';

describe('Novaunidade', () => {
  let component: Novaunidade;
  let fixture: ComponentFixture<Novaunidade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Novaunidade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Novaunidade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
