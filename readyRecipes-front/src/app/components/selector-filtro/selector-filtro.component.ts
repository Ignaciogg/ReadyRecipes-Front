import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'selectorFiltro',
  templateUrl: './selector-filtro.component.html',
  styleUrls: ['./selector-filtro.component.scss']
})
export class SelectorFiltroComponent {
  @Input() titulo: string = "Filtro no especificado";
  @Input() tag: string = "Ninguno";
  @Output() enviarTag: EventEmitter<string> = new EventEmitter<string>();

  onClick() {
    this.enviarTag.emit(this.tag);
  }
}
