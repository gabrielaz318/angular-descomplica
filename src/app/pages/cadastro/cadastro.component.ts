import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { GenericValidador } from 'src/app/common/validador';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  user: User = new User();

  constructor(private service: UserService) {}

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    name: [null, Validators.required],
    dataNascimento: [null, Validators.required],
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
    this.user.name = this.addressForm.controls['name'].value || '';
    this.user.email = this.addressForm.controls['email'].value || '';
    this.user.password = this.addressForm.controls['password'].value || '';
    this.user.phone = this.addressForm.controls['phone'].value || '';
    this.user.dateBirth = this.addressForm.controls['dataNascimento'].value || '';

    localStorage.setItem('user', JSON.stringify(this.user));

    this.service.addUser(this.user).subscribe({
      next: (response) => {
        console.log(response);
        alert('Você cadasatrou');
      },
      error: (error) => {
        console.log(error)
        alert('Erro ao cadastrar');
      }
    })
  }
}
