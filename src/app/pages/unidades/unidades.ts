import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Unidade } from '../../models/unidade.model';
import { UnidadeService } from '../../services/unidade.service';

@Component({
  standalone: true,
  selector: 'app-unidades',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './unidades.html',
  styleUrl: './unidades.scss'
})
export class Unidades implements OnInit {
  private unidadeService = inject(UnidadeService); 
  mostrarFormulario = false;
  unidade: Unidade = this.criarUnidadeVazia();
  unidades: Unidade[] = [];

  private router = inject(Router);

  propriedadeId = 1;

  ngOnInit(): void {
    this.carregarUnidades();
  }

  carregarUnidades(): void {
    this.unidadeService.getUnidades().subscribe({
      next: (res) => this.unidades = res,
      error: (err) => console.error('Erro ao buscar unidades:', err)
    });
  }

  salvarUnidade(): void {
    if (!this.unidade.id) {
      this.unidadeService.criarUnidade(this.propriedadeId, this.unidade).subscribe(res => {
        this.unidades.push(res);
        this.mostrarFormulario = false;
        this.unidade = this.criarUnidadeVazia();
      });
    } else {
      this.unidadeService.atualizarUnidade(this.unidade.id, this.unidade).subscribe(res => {
        const idx = this.unidades.findIndex(u => u.id === res.id);
        if (idx !== -1) this.unidades[idx] = res;
        this.mostrarFormulario = false;
        this.unidade = this.criarUnidadeVazia();
      });
    }
  }
  

  editarUnidade(index: number): void {
    this.unidade = { ...this.unidades[index] };
    this.mostrarFormulario = true;
  }

  excluirUnidade(idx: number): void {
    const u = this.unidades[idx];
    if (u.id !== undefined) {
      this.unidadeService.deletarUnidade(u.id).subscribe(() => {
        this.unidades.splice(idx, 1);
      });
    }
  }
  

  abrirFormulario(): void {
    this.unidade = this.criarUnidadeVazia();
    this.mostrarFormulario = true;
  }

  duplicarUnidade(index: number): void {
    const original = this.unidades[index];
    const copia: Unidade = { ...original, id: undefined }; 
    this.unidadeService.criarUnidade(this.propriedadeId, copia).subscribe({
      next: (res) => this.unidades.push(res),
      error: (err) => console.error('Erro ao duplicar unidade:', err)
    });
  }

  private criarUnidadeVazia(): Unidade {
    return {
      tipo: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      descricao: '',
      alugado: false,
      valorAluguel: null,
      dataInicio: ''
    };
  }

  irParaNovaUnidade(): void{
    this.router.navigate(['/novaunidade'])
  }
}
