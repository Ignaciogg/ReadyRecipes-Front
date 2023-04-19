import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(private httpClient: HttpClient) {
    
  }

  public getAll(): Observable<Receta[]> {
    return this.httpClient.get<Receta[]>("http://127.0.0.1:8000/api/recetas/getAll");
  }

  public create(receta: Receta): Observable<Receta> {
    return this.httpClient.post<Receta>("http://127.0.0.1:8000/api/recetas/create", receta);
  }

  public post(_id: number): Observable<Receta> {
    const body = {
      id_receta: _id
    }
    return this.httpClient.post<Receta>(
      "http://127.0.0.1:8000/api/receta",
      body,
    );
  }

  public buscador(
    _precio: number,
    _ingredientes: number[],
    _categoria: string,
    _nutriscore: number,
    _favorito: boolean,
    _id_usuario: number,
  ): Observable<Receta[]> {
    type Parametros = {
      precio?: number,
      ingredientes?: number[],
      categoria: string,
      nutriscore: number,
      favorito: boolean,
      id_usuario: number,
    }
    const body: Parametros = {
      categoria: _categoria,
      nutriscore: _nutriscore,
      favorito: _favorito,
      id_usuario: _id_usuario,
    };
    if(_ingredientes.length > 0 || _precio > 0) {
      body.ingredientes = _ingredientes;
      body.precio = _precio;
    }
    console.log("BODY:", body);
    return this.httpClient.post<Receta[]>(
      "http://127.0.0.1:8000/api/buscador",
      body,
    );
  }
}
