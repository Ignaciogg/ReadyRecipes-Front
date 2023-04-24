import { Component, Input } from '@angular/core';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';
import { Receta } from 'src/app/models/receta';

@Component({
  selector: 'recetaEncontrada',
  templateUrl: './receta-encontrada.component.html',
  styleUrls: ['./receta-encontrada.component.scss']
})
export class RecetaEncontradaComponent {
  @Input() receta: Receta = {id: 0, titulo: ""};

  constructor(
    private variablesGlobales: VariablesGlobalesService
  ) { }

  setearIdReceta() {
    this.variablesGlobales.setRecetaActual(Number(this.receta.id));
  }

  redondearBajo(numero: number): number {
    if(numero == 5) {
      return 5;
    } else {
      return Math.floor(numero);
    }
  }

  aproximarPrecio(numero: number): number {
    if(numero < 0 || numero == null || numero > 100) {
      return -1;
    } else if(numero <= 5) {
      return 5;
    } else if(5 < numero && numero <= 10) {
      return 10;
    } else if(numero <= 20) {
      return 10;
    } else {
      return 50;
    }
  }
}