import { AutorizacaoService } from './../../services/autorizacao.service';
import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


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

  constructor(
    private service: UserService,
    private AutorizacaoService: AutorizacaoService
  ) {}

  getErrorMessage() {
    if(this.email.hasError('required')) {
      return 'O e-mail é obrigatório!';
    }

    return this.email.hasError('email') ? 'Você deve preecher o e-mail com um valor válido' : '';
  }

  // loginClick() {
  //   if(this.AutorizacaoService.obterLoginStatus()) {
  //     this.AutorizacaoService.deslogar();
  //   } else {
  //     this.AutorizacaoService.autorizar("token:gerador");
  //   }
  // }

  onSubmit(): void {
    if(this.AutorizacaoService.obterLoginStatus()) {
      this.AutorizacaoService.deslogar();
    } else {
      // this.AutorizacaoService.autorizar("token:gerador");
      this.service.login(this.addressForm.value).subscribe({
        next: (response) => {
          console.log(response.idToken)
          if(response.idToken) {
            this.AutorizacaoService.autorizar(response.idToken);
            alert('Logado!')
          }

        },
        error: (erro) => {
          console.log(erro);
          alert('Houve um erro ao logar!');
        }
      })
    }
  }
}
