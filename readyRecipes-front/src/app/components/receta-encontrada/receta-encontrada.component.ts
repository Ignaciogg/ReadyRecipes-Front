import { Component, Input } from '@angular/core';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';
import { Receta } from 'src/app/models/receta';

@Component({
  selector: 'recetaEncontrada',
  templateUrl: './receta-encontrada.component.html',
  styleUrls: ['./receta-encontrada.component.scss']
})
export class RecetaEncontradaComponent {
  @Input() receta: Receta = new Receta(0, "");

  constructor(
    private variablesGlobales: VariablesGlobalesService
  ) { }
  
  setearIdReceta() {
    this.variablesGlobales.setRecetaActual(Number(this.receta.id));
  }
  
  redondearNutriscore(numero: number): number {
    if(4.5 < numero) {
      return 5;
    } else if(3.5 < numero && numero <= 4.5) {
      return 4;
    } else if(2.5 < numero && numero <= 3.5) {
      return 3;
    } else if(1.5 < numero && numero <= 2.5) {
      return 2;
    } else {
      return 1;
    }
  }

  aproximarPrecio(numero: number): number {
    if(numero < 0 || numero == null || numero == undefined || numero > 200) {
      return -1;
    } else if(numero <= 2) {
      return 2;
    } else if(numero <= 5) {
      return 5;
    } else if(numero <= 15) {
      return 15;
    } else {
      return 50;
    }
  }
}