import { Component, Input } from '@angular/core';

@Component({
  selector: 'aplicadorFiltro',
  templateUrl: './aplicador-filtro.component.html',
  styleUrls: ['./aplicador-filtro.component.scss']
})
export class AplicadorFiltroComponent {
  @Input() titulo: string = "No se ha especificado título";
  @Input() indicador: string = "+";
}
