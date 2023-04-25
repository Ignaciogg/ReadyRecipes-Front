import { Component, Input, HostListener } from '@angular/core';
import { VariablesGlobalesService } from '../../services/variables-globales.service';
import { RecetaService } from '../../services/receta.service';
import { ComentarioService } from '../../services/comentario.service';
import { Receta } from '../../models/receta';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'viewReceta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss'],
})
export class RecetaComponent {
  public receta: Receta = {id: 1, titulo: ""};
  public minMostrarPulgares: number = 850;
  public isViewportLarge: boolean = window.innerWidth > this.minMostrarPulgares;
  public cargando: boolean = false;
  transcripcion: string = "Lorem ipsum dolor sit amet.";
  comentarioInput: string = "";
  @Input() esFavorito: boolean = false;
  comentarios = [
    { autor: "", mensaje: "" },
  ];

  constructor(
    private variablesGlobalesService: VariablesGlobalesService,
    private comentarioService: ComentarioService,
    private recetaService: RecetaService,
    public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.cargando = true;
    try {
      this.cargarReceta();
      this.cargarComentarios();
    } catch(e) {
      console.log("Error cargando la receta: ", e);
    }
    console.log("LOCALSTORAGE:");
    console.log("Nombre: ", localStorage.getItem('nombreUsuario'));
    console.log("Apellidos: ", localStorage.getItem('apellidosUsuario'));
    console.log("Correo: ", localStorage.getItem('correoUsuario'));
    this.cargando = false;
  }

  private cargarReceta() {
    const idReceta = this.variablesGlobalesService.getRecetaActual();
    this.recetaService.post(idReceta).subscribe(data=> {
      this.receta = data;
      this.receta.precio ? this.receta.precio = Number(this.receta.precio?.toFixed(2)) : 0;
      console.log(data);
    });
  }

  private cargarComentarios() {
    const id_receta_actual = this.variablesGlobalesService.getRecetaActual();
    this.comentarioService.getComentariosReceta(id_receta_actual).subscribe(data=> {
      this.comentarios = [];
      data.forEach(comentario => this.comentarios.push({
        autor: comentario.nombre + " " + comentario.apellidos,
        mensaje: comentario.contenido,
      }));
      this.comentarios = this.comentarios.reverse();
    });
  }

  nuevoComentario(/*_nombre: string, _apellidos: string,*/ _contenido: string) {
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