import { Component } from '@angular/core';
import { DefaultRegisterLayout } from '../../components/default-register-layout/default-register-layout';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ DefaultRegisterLayout,  ReactiveFormsModule],
  template: '<app-default-register-layout></app-default-register-layout>',
  styleUrl: './register.scss'
})
export class Register {

}
