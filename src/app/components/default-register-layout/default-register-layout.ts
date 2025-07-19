
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario';
import { LoginService } from '../../services/login-service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-default-register-layout',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './default-register-layout.html',
  styleUrls: ['./default-register-layout.scss']
})

export class DefaultRegisterLayout {
  form: FormGroup;
  mensagem: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.mensagem = ' Preencha todos os campos corretamente.';
      return;
    }

    this.usuarioService.cadastrarUsuario(this.form.value).subscribe({
      next: () => {
        this.mensagem = ' Usuário cadastrado com sucesso! Redirecionando...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        },);
      },
      error: () => {
        this.mensagem = ' Erro ao cadastrar usuário.';
      }
    });
  }
}
