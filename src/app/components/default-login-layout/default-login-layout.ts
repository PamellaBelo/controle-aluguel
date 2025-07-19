import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario';


@Component({
  selector: 'app-default-login-layout',
  imports: [RouterModule],
  templateUrl: './default-login-layout.html',
  styleUrl: './default-login-layout.scss'
})
export class DefaultLoginLayout {
  loginForm: FormGroup;

  constructor(private router: Router,  private fb: FormBuilder,
    private usuarioService: UsuarioService,) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', Validators.required]
      });
    }


    onLogin(){
      if (this.loginForm.valid){
        this.usuarioService.login(this.loginForm.value).subscribe({
          next: (res) => {

            localStorage.setItem('token', res.token);

            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Erro no login:', err);
          }
        })

      }
    }
  
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();
  
  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.router.navigate(['/cadastro']);
  }

}
