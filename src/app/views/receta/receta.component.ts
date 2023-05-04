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
  public letraNutriscore = "";
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
    this.cargando = false;
  }
  
  private cargarReceta() {
    const idReceta = this.variablesGlobalesService.getRecetaActual();
    this.recetaService.post(idReceta).subscribe(data=> {
      this.receta = data;
      this.receta.precio ? this.receta.precio = Number(this.receta.precio?.toFixed(2)) : 0;
      this.letraNutriscore = this.nutriscoreEnLetra(this.receta.nutriscore!);
      console.log(data);
    });
  }

  nutriscoreEnLetra(numero: number): string {
    if(4.5 < numero) {
      return "A";
    } else if(3.5 < numero && numero <= 4.5) {
      return "B";
    } else if(2.5 < numero && numero <= 3.5) {
      return "C";
    } else if(1.5 < numero && numero <= 2.5) {
      return "D";
    } else {
      return "E";
    }
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