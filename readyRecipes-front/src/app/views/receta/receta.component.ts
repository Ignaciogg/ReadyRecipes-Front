import { Component, Input, HostListener } from '@angular/core';
import { RecetaService } from '../../services/receta.service';
import { AutenticacionService } from '../../services/autenticacion.service';
import { ComentarioService } from '../../services/comentario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Receta } from '../../models/receta';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/models/comentario';

@Component({
  selector: 'viewReceta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss'],
})
export class RecetaComponent {

  public id: number = -1;

  public receta: Receta = {id: 1, titulo: ""};
  public minMostrarPulgares: number = 850;
  public isViewportLarge: boolean = window.innerWidth > this.minMostrarPulgares;
  public cargando: boolean = false;
  public letraNutriscore = "";
  comentarioInput: string = "";
  @Input() esFavorito: boolean = false;
  comentarios: Comentario[] = [];

  constructor(
    private comentarioService: ComentarioService,
    private recetaService: RecetaService,
    private autenticacionService: AutenticacionService,
    private usuarioService: UsuarioService,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id") || "");
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
    this.recetaService.get(this.id).subscribe(data=> {
      this.receta = data;
      this.receta.precio ? this.receta.precio = Number(this.receta.precio?.toFixed(2)) : 0;
      this.letraNutriscore = this.nutriscoreEnLetra(this.receta.nutriscore!);
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
    this.comentarioService.getComentariosReceta(this.id).subscribe(data => {
      this.comentarios = data;
      this.comentarios = this.comentarios.reverse();
    });
  }
  
  nuevoComentario(_contenido: string) {
    const idReceta = this.id;
    const idUsuario = Number(this.autenticacionService.getId());
    this.comentarioService.nuevoComentario(idReceta, idUsuario, _contenido).subscribe(data => {
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

  estaLogeado(): boolean {
    return this.autenticacionService.estaLogeado();
  }

  getCorreoUsuario(): string {
    return this.autenticacionService.getEmail() || "";
  }
}