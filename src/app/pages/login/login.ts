import { Component, isStandalone } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayout,
    ReactiveFormsModule,
    PrimaryInput,
    CommonModule
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm!: FormGroup;
  
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  
  submit(){
  if (this.loginForm.invalid) return;

  const{ email, password} = this.loginForm.value;

  this.loginService.login(email, password).subscribe({
    next: () => {
      console.log("login com sucesso");

      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.error("Erro no login", err);
    }
  });
  }
  
  navigate(){
    this.router.navigate(["signup"])
    
  }



}
