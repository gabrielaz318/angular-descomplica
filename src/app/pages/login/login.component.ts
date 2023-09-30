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
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

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
