import { Component, Input } from '@angular/core';

@Component({
  selector: 'categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  @Input() nombre: string = "Nombre";
  @Input() imagen: string = "http://localhost:4200/biblioteca/verduras.png";
}
