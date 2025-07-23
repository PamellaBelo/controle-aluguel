import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GrupoImovelService, GrupoImovel } from '../../services/grupo-imovel';

@Component({
  selector: 'app-cadastrar-editar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-editar.html',
  styleUrl: './cadastrar-editar.scss'
})
export class CadastrarEditar implements OnInit {
  form: FormGroup;
  mostrandoFormulario = false;

  tiposImovel = [
    { id: 1, nome: 'apartamento' },
    { id: 2, nome: 'casa' },
    { id: 3, nome: 'comercial' }
  ];

  mostrarNovoTipoImovel: boolean[] = [];
  mostrarNovoGrupo: boolean = false;

  grupos: GrupoImovel[] = [];

  constructor(
    private fb: FormBuilder,
    private grupoImovelService: GrupoImovelService
  ) {
    this.form = this.fb.group({
      imoveis: this.fb.array([])
    });

    this.adicionarImovel();
  }

  ngOnInit(): void {
    this.grupos = this.grupoImovelService.getGrupos();
  }

  get imoveis(): FormArray {
    return this.form.get('imoveis') as FormArray;
  }

  criarImovel(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      tipoImovel: ['', Validators.required],
      dataAquisicao: ['', Validators.required],
      centroCusto: ['', Validators.required],
      natureza: ['', Validators.required],
      grupoId: [''] 
    });
  }

  adicionarImovel(): void {
    this.imoveis.push(this.criarImovel());
  }

  salvar(): void {
    console.log(this.form.value);
  }

  voltar(): void {
    this.mostrandoFormulario = false;
  }

  mostrarAdicionar(): void {
    this.mostrandoFormulario = true;
    this.form.reset();
    this.imoveis.clear();
    this.adicionarImovel();
  }

  mostrarEditar(): void {
    this.mostrandoFormulario = true;
  }

  onTipoImovelChange(event: any, index: number): void {
    const selected = event.target.value;
    this.mostrarNovoTipoImovel[index] = selected === 'novo';
  }

  adicionarNovoTipoImovel(event: any, index: number): void {
    const nome = event.target.value.trim();
    if (!nome) return;

    const tipoExistente = this.tiposImovel.find(
      tipo => tipo.nome.toLowerCase() === nome.toLowerCase()
    );
    if (tipoExistente) {
      this.imoveis.at(index).patchValue({ tipoImovel: tipoExistente.id });
    } else {
      const novoId = this.tiposImovel.length + 1;
      const novoTipo = { id: novoId, nome };
      this.tiposImovel.push(novoTipo);
      this.imoveis.at(index).patchValue({ tipoImovel: novoId });
    }

    this.mostrarNovoTipoImovel[index] = false;
  }

  onGrupoChange(event: any): void {
    this.mostrarNovoGrupo = event.target.value === 'novo';
  }

  adicionarNovoGrupo(event: any): void {
    const nome = event.target.value.trim();
    if (!nome) return;

    const novoGrupo = this.grupoImovelService.adicionarGrupo(nome);
    this.grupos.push(novoGrupo);

    this.imoveis.at(0).patchValue({ grupoId: novoGrupo.id }); 
    this.mostrarNovoGrupo = false;
  }
}
