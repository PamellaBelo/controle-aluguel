import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-unidades',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './unidades.html',
  styleUrl: './unidades.scss'
})
export class Unidades {
  mostrarFormulario = false;

  novaUnidade = {
    nome: '',
    endereco: ''
  };

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  salvarUnidade() {
    console.log('Unidade salva:', this.novaUnidade);
   
    this.novaUnidade = { nome: '', endereco: '' };
    this.mostrarFormulario = false;
  }
}
