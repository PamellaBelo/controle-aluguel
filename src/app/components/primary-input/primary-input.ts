import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../../pages/login/login';

type InputTypes = "text" | "email" | "password" | "telefone"

@Component({
  selector: 'app-primary-input',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './primary-input.html',
  styleUrl: './primary-input.scss'
})
export class PrimaryInput {

  @Input() formName: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() formGroup!: FormGroup;
  @Input() autocomplete: string = '';
  
}
