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


  public getComentariosReceta(_id_receta: number): Observable<Comentario[]> {
    const body = {
      id_receta: _id_receta,
    }
    return this.httpClient.post<Comentario[]>(
      environment.apiUrl + "comentariosReceta",
      body,
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
      "http://127.0.0.1:8000/api/nuevoComentario",
      body,
    );
  }

  public numeroComentarios(): Observable<any[]> {
    return this.httpClient.post<any>(
      "http://127.0.0.1:8000/api/numeroComentarios",
      {},
    );
  }
}