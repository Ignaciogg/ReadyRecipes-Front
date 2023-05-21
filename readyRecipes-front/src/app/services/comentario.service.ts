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
  
  public numeroComentarios(): Observable<any[]> {
    return this.httpClient.get<any>(
      environment.apiUrl + "numeroComentarios",
    );
  }
}