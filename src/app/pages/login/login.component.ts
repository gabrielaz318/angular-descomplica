import { AutorizacaoService } from './../../services/autorizacao.service';
import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    email: [null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(64),
        Validators.email
      ])
    ],
    password: [null, Validators.required]
  });

  email = this.addressForm.controls['email'];

  getErrorMessage() {
    if(this.email.hasError('required')) {
      return 'O e-mail é obrigatório!';
    }

    return this.email.hasError('email') ? 'Você deve preecher o e-mail com um valor válido' : '';
  }

  constructor(
    private AutorizacaoService: AutorizacaoService
  ) {}

  loginClick() {
    if(this.AutorizacaoService.obterLoginStatus()) {
      this.AutorizacaoService.deslogar();
    } else {
      this.AutorizacaoService.autorizar("token:gerador");
    }
  }

  onSubmit(): void {
    this.loginClick();
    alert('Thanks!');
  }
}
