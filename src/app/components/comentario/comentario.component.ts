import { Component, Input } from '@angular/core';

@Component({
  selector: 'comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent {
  @Input() autor: string = "No se ha especificado autor";
  @Input() mensaje: string = "No se ha especificado mensaje";
}
