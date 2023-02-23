import { Component, Input } from '@angular/core';

@Component({
  selector: 'selectorFiltro',
  templateUrl: './selector-filtro.component.html',
  styleUrls: ['./selector-filtro.component.scss']
})
export class SelectorFiltroComponent {
  @Input() texto: string = "Filtro no especificado";
}
