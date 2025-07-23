import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Imovel, ImovelService } from '../../services/imovel';

interface Despesa {
  id?: number;
  nome: string;
  dataVencimento: string;
  valor: number;
  pago: boolean;
}

@Component({
  selector: 'app-adicionar-editar',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './adicionar-editar.html',
  styleUrls: ['./adicionar-editar.scss']
})
export class AdicionarEditar implements OnInit {
  imoveis: Imovel[]=[];
  despesaForm: FormGroup;
  despesas: Despesa[] = [];
  mostrandoFormulario = false; 
  editando: boolean = false;
  despesaId?: number;
  mostrarNovoCentroCusto: boolean[] = [];
  mostrarNovaNatureza: boolean[] = [];


  centrosCusto = [
    { id: 1, nome: 'Manutenção' },
    { id: 2, nome: 'Administração' }
  ];

  naturezas = [
    { id: 1, nome: 'Fixa' },
    { id: 2, nome: 'Variável' }
  ];
 

  constructor(
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private imovelService: ImovelService
  ) {
    this.despesaForm = this.fb.group({
      nome: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      pago: [false],
      centroCusto: ['', Validators.required],
      natureza: ['', Validators.required],
      imovelId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.imoveis = this.imovelService.getImoveis();
  
    if (this.imoveis.length === 0) {
      alert('Você precisa cadastrar um imóvel antes de adicionar uma despesa.');
      this.router.navigate(['/cadastrar-imovel']); 
      return; 
    }
  
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
   
    this.despesaForm.patchValue({
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

  onCentroCustoChange(event: any): void {
    const selected = event.target.value;
    this.mostrarNovoCentroCusto[0] = selected === 'novo';
  }
  
  adicionarNovoCentroCusto(event: any): void {
    const nome = event.target.value.trim();
    if (!nome) return;
  
    const novoId = this.centrosCusto.length + 1;
    const novoCentro = { id: novoId, nome };
  
    this.centrosCusto.push(novoCentro);
    this.despesaForm.patchValue({ centroCusto: novoId });
    this.mostrarNovoCentroCusto[0] = false;
  }
  
  onNaturezaChange(event: any): void {
    const selected = event.target.value;
    this.mostrarNovaNatureza[0] = selected === 'novo';
  }
  
  adicionarNovaNatureza(event: any): void {
    const nome = event.target.value.trim();
    if (!nome) return;
  
    const novoId = this.naturezas.length + 1;
    const novaNatureza = { id: novoId, nome };
  
    this.naturezas.push(novaNatureza);
    this.despesaForm.patchValue({ natureza: novoId });
    this.mostrarNovaNatureza[0] = false;
  }
  

}

