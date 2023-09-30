import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
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
    alert('Entrou no onSubmit');
  }
}
