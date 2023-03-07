import { Component, Input } from '@angular/core';

@Component({
  selector: 'recetaEncontrada',
  templateUrl: './receta-encontrada.component.html',
  styleUrls: ['./receta-encontrada.component.scss']
})
export class RecetaEncontradaComponent {
  @Input() ruta: string = "/receta";
  @Input() nombre: string = "Ruta no especificada";
}
