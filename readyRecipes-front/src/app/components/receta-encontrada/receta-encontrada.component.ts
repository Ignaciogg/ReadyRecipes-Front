import { Component, Input } from '@angular/core';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';

@Component({
  selector: 'recetaEncontrada',
  templateUrl: './receta-encontrada.component.html',
  styleUrls: ['./receta-encontrada.component.scss']
})
export class RecetaEncontradaComponent {
  @Input() ruta: string = "/receta";
  @Input() nombre: string = "Nombre no especificado";
  @Input() idReceta: string = "-1";

  constructor(
    private variablesGlobales: VariablesGlobalesService
  ) { }

  setearIdReceta() {
    this.variablesGlobales.setRecetaActual(Number(this.idReceta));
  }
}