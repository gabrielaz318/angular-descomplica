import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  user: User = new User();
  addressForm: any;
  email: any;

  private fb = inject(FormBuilder);

  constructor() {
    if(localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
    this.addressForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(64),
          Validators.email
        ])
      ],
      phone: [this.user.phone, Validators.required],
      password: [null, Validators.required]
    });
    this.email = this.addressForm.controls['email'];
  }


  getErrorMessage() {
    if(this.email.hasError('required')) {
      return 'O e-mail é obrigatório!';
    }

    return this.email.hasError('email') ? 'Você deve preecher o e-mail com um valor válido' : '';
  }


  onSubmit(): void {
    this.user.id = new Date().getTime();
    this.user.name = this.addressForm.controls['name'].value || '';
    this.user.email = this.addressForm.controls['email'].value || '';
    this.user.password = this.addressForm.controls['password'].value || '';
    this.user.phone = this.addressForm.controls['phone'].value || '';

    alert('Você cadasatrou');

    console.log(this.user)
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
