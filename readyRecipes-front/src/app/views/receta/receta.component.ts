import { Component, Input, HostListener } from '@angular/core';
import { VariablesGlobalesService } from '../../services/variables-globales.service';
import { RecetaService } from '../../services/receta.service';
import { ComentarioService } from '../../services/comentario.service';
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
  transcripcion: string = "Lorem ipsum dolor sit amet.";
  comentarioInput: string = "";
  @Input() esFavorito: boolean = false;
  @Input() nutriscore: string[1] = "B";
  @Input() precio: number = 3.45;
  @Input() ingredientes: string[] = [
    "Aceite", "Arroz", "Sal", "Orégano"
  ];
  comentarios = [
    { autor: "", mensaje: "" },
  ];

  constructor(
    private variablesGlobalesService: VariablesGlobalesService,
    private comentarioService: ComentarioService,
    private recetaService: RecetaService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.cargarReceta();
    this.cargarComentarios();
    this.cargando = false;
  }

  private cargarReceta() {
    this.recetaService.get(1).subscribe(data=> {
      this.receta = data;
      this.receta.url = (this.receta.url == "") ? "" : this.receta.url!.replace("watch?v=", "embed/");
    });
  }

  private cargarComentarios() {
    this.comentarioService.getComentariosReceta(1).subscribe(data=> {
      this.comentarios = [];
      data.forEach(comentario => this.comentarios.push({
        autor: comentario.nombre + " " + comentario.apellidos,
        mensaje: comentario.contenido,
      }));
    });
  }

  nuevoComentario(_contenido: string) {
    this.comentarioService.nuevoComentario(_contenido).subscribe(data=> {
      this.cargarComentarios();
      this.comentarioInput = "";
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
}