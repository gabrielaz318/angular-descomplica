import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { GenericValidador } from 'src/app/common/validador';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  user: User = new User();

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(64),
        Validators.email
      ])
    ],
    cpf: [null, Validators.compose([
        Validators.required,
        GenericValidador.isValidCpf()
      ])
    ],
    cnpj: [null, Validators.required],
    phone: [null, Validators.required],
    password: [null, Validators.required]
  });

  email = this.addressForm.controls['email'];

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
