import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private httpClient: HttpClient) { }

  public getComentariosReceta(_id: number): Observable<Comentario[]> {
    return this.httpClient.get<Comentario[]>(
      environment.apiUrl + "comentariosReceta/" + _id,
      { responseType:'json' }
    );
  }

  public nuevoComentario(_id_receta: number, _id_usuario: number, _contenido: string): Observable<void> {
    const body = {
      id_receta: _id_receta,
      id_usuario: _id_usuario,
      contenido: _contenido,
    }
    return this.httpClient.post<void>(
      environment.apiUrl + "nuevoComentario",
      body,
    );
  }

  /*
    "SQLSTATE[23000]: Integrity constraint violation: 1452 Cannot add or update a child row: a foreign key
    constraint fails (`pc2_grupo4`.`comentarios`, CONSTRAINT `comentarios_id_usuario_foreign` FOREIGN KEY
    (`id_Usuario`) REFERENCES `usuarios` (`id`)) (SQL: insert into `comentarios` (`id_Receta`, `id_Usuario`,
    `contenido`, `updated_at`, `created_at`) values (2, 0, grege, 2023-05-19 21:16:51, 2023-05-19 21:16:51))"
  */

  public numeroComentarios(): Observable<any[]> {
    return this.httpClient.post<any>(
      environment.apiUrl + "numeroComentarios",
      {},
    );
  }
}