import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UnidadeService } from '../../services/unidade.service';

@Component({
  selector: 'app-novaunidade',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './novaunidade.html',
  styleUrl: './novaunidade.scss'
})
export class Novaunidade {
  unidadeForm: FormGroup;
  propriedadeId: number = 1; 
  constructor(
    private fb: FormBuilder,
    private unidadeService: UnidadeService,
    public router: Router
  ) {
    this.unidadeForm = this.fb.group({
      tipo: ['', Validators.required],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required],
      descricao: [''],
      alugado: [false],
      valorAluguel: [''],
      dataInicio: ['']
    });
  }

  onSubmit() {
    if (this.unidadeForm.valid) {
      const unidade = this.unidadeForm.value;
      this.unidadeService.criarUnidade(this.propriedadeId, unidade).subscribe({
        next: () => {
          alert('Unidade criada com sucesso!');
          this.router.navigate(['/unidades']);
        },
        error: (err) => {
          console.error('Erro ao salvar unidade:', err);
          alert('Erro ao salvar unidade.');
        }
      });
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  }
  
}
