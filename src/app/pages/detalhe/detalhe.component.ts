import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent {

  constructor(private route: ActivatedRoute) { }

  identificador: number = 0;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if(params['id'] !== undefined) {
        this.identificador = +params['id'];
        console.log(this.identificador);
      }
    });
  }
}
