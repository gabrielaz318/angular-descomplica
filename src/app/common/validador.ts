import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export class GenericValidador {
  constructor() {}

  static isValidCpf(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let cpf = control.value;

      if (!cpf) {
        return null; // Retorna nulo se o campo estiver vazio
      }

      cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

      if (cpf.length !== 11) {
        return { cpfNotValid: true }; // Retorna um erro se o CPF não tiver 11 dígitos
      }

      if (/^(\d)\1{10}$/.test(cpf)) {
        return { cpfNotValid: true }; // Retorna um erro se todos os dígitos forem iguais
      }

      let sum = 0;
      let remainder;

      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
      }

      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }

      if (remainder !== parseInt(cpf.substring(9, 10), 10)) {
        return { cpfNotValid: true }; // Retorna um erro se o dígito verificador 1 estiver errado
      }

      sum = 0;

      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
      }

      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }

      if (remainder !== parseInt(cpf.substring(10, 11), 10)) {
        return { cpfNotValid: true }; // Retorna um erro se o dígito verificador 2 estiver errado
      }

      return null; // Retorna nulo se o CPF for válido
    };
  }
}
