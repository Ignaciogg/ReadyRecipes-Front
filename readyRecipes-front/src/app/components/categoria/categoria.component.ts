import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  @Input() nombre: string = "Nombre";

  // constructor(nombre:string) {
    // this.nombre = nombre;
  // }
}
