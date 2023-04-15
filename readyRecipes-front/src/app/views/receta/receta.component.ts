import { Component, Input, HostListener } from '@angular/core';
import { VariablesGlobalesService } from '../../services/variables-globales.service';
import { RecetaService } from '../../services/receta.service';
import { Receta } from '../../models/receta';

@Component({
  selector: 'viewReceta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent {
  public receta: Receta = {id: 1};
  public minMostrarPulgares: number = 850;
  public isViewportLarge: boolean = window.innerWidth > this.minMostrarPulgares;
  public cargando: boolean = false;
  @Input() esFavorito: boolean = false;
  @Input() nutriscore: string[1] = "B";
  @Input() precio: number = 3.45;
  @Input() ingredientes: string[] = [
    "Aceite", "Arroz", "Sal", "Orégano"
  ];
  @Input() comentarios = [
    {
      autor: "Alex Tensa",
      mensaje: "Me quedé sin originalidad, lo siento",
    },
    {
      autor: "Samu",
      mensaje: "Y además es muy fácil de preparar",
    },
    {
      autor: "Mario Uceda",
      mensaje: "Pues a mí me parece que tiene mala pinta...",
    },
    {
      autor: "Ignacio Gil",
      mensaje: "La probé ayer para cenar. ¡Riquísimo!",
    },
    {
      autor: "Pablo González",
      mensaje: "¡Qué buena pinta!",
    }
  ];

  constructor(
    private variablesGlobalesService: VariablesGlobalesService,
    private recetaService: RecetaService) { }

  ngOnInit(): void {
    this.cargarReceta();
  }

  private async cargarReceta() {
    this.cargando = true;
    this.recetaService.get(1).subscribe(data=> {
      this.receta = data;
      this.cargando = false;
      this.receta.url = (this.receta.url == "") ? "" : this.receta.url!.replace("watch?v=", "embed/");
    });
  }
  
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