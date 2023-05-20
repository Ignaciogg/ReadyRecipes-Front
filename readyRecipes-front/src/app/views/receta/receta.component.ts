import { Component, Input, HostListener } from '@angular/core';
import { RecetaService } from '../../services/receta.service';
import { AutenticacionService } from '../../services/autenticacion.service';
import { ComentarioService } from '../../services/comentario.service';
import { FavoritoService } from 'src/app/services/favorito.service';
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
  public cargando: number = 0;
  public letraNutriscore = "";
  comentarioInput: string = "";
  esFavorito: boolean = false;
  comentarios: Comentario[] = [];

  constructor(
    private comentarioService: ComentarioService,
    private recetaService: RecetaService,
    private autenticacionService: AutenticacionService,
    private favoritoService: FavoritoService,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.cargando = 0;
    this.id = Number(this.route.snapshot.paramMap.get("id") || "");
    try {
      this.cargarReceta();
      this.getEsFavorito();
      this.cargarComentarios();
    } catch(e) {
      console.log("Error cargando la receta: ", e);
    }
  }
  
  private cargarReceta() {
    this.recetaService.get(this.id).subscribe(data=> {
      this.receta = data;
      this.receta.precio ? this.receta.precio = Number(this.receta.precio?.toFixed(2)) : 0;
      this.letraNutriscore = this.nutriscoreEnLetra(this.receta.nutriscore!);
      this.cargando++;
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
      this.cargando++;
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

  cambiarFavorito() {
    if(this.esFavorito) {
      this.favoritoService.removeFavoritos(this.id, Number(this.autenticacionService.getId())).subscribe();
    } else {
      this.favoritoService.addFavoritos(this.id, Number(this.autenticacionService.getId())).subscribe();
    }
    this.esFavorito = !this.esFavorito;
  }

  getEsFavorito() {
    this.favoritoService.esFavorito(this.id, Number(this.autenticacionService.getId())).subscribe(data => {
      this.esFavorito = (data == 1);
      this.cargando++;
    });
  }

  estaLogeado(): boolean {
    return this.autenticacionService.estaLogeado();
  }

  getCorreoUsuario(): string {
    return this.autenticacionService.getEmail() || "";
  }
}