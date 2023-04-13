import { Component, Input, HostListener } from '@angular/core';
import { VariablesGlobalesService } from '../../services/variables-globales.service';

@Component({
  selector: 'viewReceta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent {
  public minMostrarPulgares: number = 850;
  public isViewportLarge: boolean = window.innerWidth > this.minMostrarPulgares;
  @Input() nombre: string = "Nombre de la receta";
  @Input() esFavorito: boolean = false;
  @Input() rutaVideo: string = "https://www.youtube.com/embed/9ZnhL3ADyKs";
  @Input() numComentariosPositivos: number = 27;
  @Input() numComentariosNeutros: number = 109;
  @Input() numComentariosNegativos: number = 13;
  @Input() sentimientoMedio: number = 78;
  @Input() nutriscore: string[1] = "B";
  @Input() precio: number = 3.45;
  @Input() ingredientes: string[] = [
    "Aceite", "Arroz", "Sal", "Orégano"
  ];
  @Input() comentarios = [
    {
      autor: "Pablo González",
      mensaje: "¡Qué buena pinta!",
    },
    {
      autor: "Ignacio Gil",
      mensaje: "La probé ayer para cenar. ¡Riquísimo!",
    },
    {
      autor: "Mario Uceda",
      mensaje: "Pues a mí me parece que tiene mala pinta...",
    },
    {
      autor: "Samu",
      mensaje: "Y además es muy fácil de preparar",
    },
    {
      autor: "Alex Tensa",
      mensaje: "Me quedé sin originalidad, lo siento",
    }
  ];

  constructor(private variablesGlobalesService: VariablesGlobalesService) { }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isViewportLarge = window.innerWidth > this.minMostrarPulgares;
  }

  cambiarFavorito() {
    this.esFavorito = !this.esFavorito;
  }

  getCorreoUsuario(): string {
    return this.variablesGlobalesService.getCorreoUsuario();
  }

  @Input() transcripcion: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget mi aliquam, varius velit at, sagittis sapien. Nam consequat vestibulum est, sed placerat enim tincidunt sed. Aliquam ac magna eget mauris venenatis interdum in vel erat. Vestibulum ac est vel elit semper molestie. Suspendisse porttitor eros eu quam posuere, ac ultrices lorem efficitur. In lacinia mi ut felis tempor, eget bibendum mauris vestibulum. Maecenas posuere imperdiet massa, eu lacinia turpis pretium vel. Quisque efficitur purus ut dolor dignissim, id interdum purus rutrum. Aenean sit amet sapien erat. Sed lobortis lacus quis libero dapibus, ut molestie nisl faucibus. Donec feugiat enim vitae lobortis viverra. Mauris placerat lorem a aliquet ultricies. Sed rhoncus interdum nunc in fringilla. Etiam vel libero sollicitudin, malesuada sapien eget, consequat turpis. Nulla facilisi. Etiam non tempor magna. Praesent dignissim arcu ut est ullamcorper, nec rutrum velit interdum. Aenean id metus augue. Fusce in arcu vel magna vestibulum faucibus sit amet ut magna. Nulla sed tristique enim. Aliquam sed ligula nec neque elementum consequat. Vivamus ut augue vel massa efficitur finibus. Aliquam erat volutpat.";
}