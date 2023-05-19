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

  public nuevoComentario(_contenido: string): Observable<Comentario[]> {
    const body = {
      id_receta: 1,
      id_usuario: 1,
      contenido: _contenido,
    }
    return this.httpClient.post<Comentario[]>(
      environment.apiUrl + "nuevoComentario",
      body,
    );
  }

  public numeroComentarios(): Observable<any[]> {
    return this.httpClient.post<any>(
      environment.apiUrl + "numeroComentarios",
      {},
    );
  }
}