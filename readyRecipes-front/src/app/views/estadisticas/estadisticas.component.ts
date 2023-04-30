import { Component } from '@angular/core';

@Component({
  selector: 'estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {
  usuarioBorrarInput: string = "";

  solicitarEliminarUsuario(_id: string): void {

  }
}