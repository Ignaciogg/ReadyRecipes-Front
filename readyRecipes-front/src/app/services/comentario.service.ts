import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private httpClient: HttpClient) { }


  public getComentariosReceta(id_Receta: number): Observable<Comentario[]> {
    const body = {
      id_Receta: id_Receta,
    }
    return this.httpClient.post<Comentario[]>(
      "http://127.0.0.1:8000/api/comentariosReceta",
      body,
      { responseType:'json' }
    );
  }

  public nuevoComentario(_contenido: string): Observable<Comentario[]> {
    const body = {
      id_Receta: 1,
      id_Usuario: 1,
      contenido: _contenido,
    }
    return this.httpClient.post<Comentario[]>(
      "http://127.0.0.1:8000/api/nuevoComentario",
      body,
    );
  }
}