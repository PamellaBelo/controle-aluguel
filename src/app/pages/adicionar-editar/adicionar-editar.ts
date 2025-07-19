import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Despesa {
  id?: number;
  nome: string;
  dataVencimento: string;
  valor: number;
  pago: boolean;
}

@Component({
  selector: 'app-adicionar-editar',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './adicionar-editar.html',
  styleUrls: ['./adicionar-editar.scss']
})
export class AdicionarEditar implements OnInit {
  despesaForm: FormGroup;
  despesas: Despesa[] = [];
  mostrandoFormulario = false; // Começa como falso
  editando: boolean = false;
  despesaId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.despesaForm = this.fb.group({
      nome: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      pago: [false],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.despesaId = params['id'] ? +params['id'] : undefined;

      if (this.despesaId !== undefined) {
        this.editando = true;
        this.mostrandoFormulario = true;
        this.carregarDespesa(this.despesaId);
      }
    });
  }

  mostrarAdicionar(): void {
    this.editando = false;
    this.mostrandoFormulario = true;
    this.despesaForm.reset();
  }

  mostrarEditar(): void {
    this.editando = true;
    this.mostrandoFormulario = true;
    // você pode carregar um exemplo aqui ou buscar por id
    this.despesaForm.patchValue({
      nome: 'Água',
      dataVencimento: '2025-08-10',
      valor: 120,
      pago: true
    });
  }

  voltar(): void {
    this.mostrandoFormulario = false;
    this.editando = false;
  }

  carregarDespesa(id: number): void {
    const despesa = this.despesas.find(d => d.id === id);
    if (despesa) {
      this.despesaForm.patchValue(despesa);
    }
  }

  salvar(): void {
    if (this.despesaForm.invalid) {
      this.despesaForm.markAllAsTouched();
      return;
    }

    const dados: Despesa = this.despesaForm.value;

    if (this.editando) {
      const index = this.despesas.findIndex(d => d.id === this.despesaId);
      if (index > -1) {
        this.despesas[index] = { id: this.despesaId, ...dados };
      }
    } else {
      const novoId = this.despesas.length > 0
        ? Math.max(...this.despesas.map(d => d.id || 0)) + 1
        : 1;

      this.despesas.push({ id: novoId, ...dados });
    }

    alert('Despesa salva com sucesso!');
    this.router.navigate(['/gestao-despesas']);
  }
}

