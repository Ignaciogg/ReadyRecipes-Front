import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(private httpClient: HttpClient) {
    
  }

  public getAll(): Observable<Receta[]> {
    return this.httpClient.get<Receta[]>(environment.apiUrl + "recetas/getAll");
  }

  public create(receta: Receta): Observable<Receta> {
    return this.httpClient.post<Receta>(environment.apiUrl + "create", receta);
  }

  public get(_id: number): Observable<Receta> {
    return this.httpClient.get<Receta>(
      environment.apiUrl + "receta/" + _id,
    );
  }

  public buscador(
    _precio: number,
    _ingredientes: number[],
    _categoria: string,
    _nutriscore: number,
    _favorito: boolean,
  ): Observable<Receta[]> {
    const body: any = {
      categoria: _categoria,
      nutriscore: _nutriscore,
      favorito: _favorito,
      precio: _precio,
      ingredientes: _ingredientes,
    };
    return this.httpClient.post<Receta[]>(
      environment.apiUrl + "buscador",
      body,
    );
  }

  public modificarReceta(_receta: Receta): Observable<void> {
    const body = {
      id: _receta.id,
      titulo: _receta.titulo,
      texto: _receta.texto,
      categoria: _receta.categoria,
    };
    return this.httpClient.post<void>(
      environment.apiUrl + "modificarReceta",
      body,
    );
  }

  public recetasPorCategoria(): Observable<any> {
    const body = {};
    return this.httpClient.post<any>(
      environment.apiUrl + "recetasPorCategoria",
      body,
    );
  }

  public recetasPorNutriscore(): Observable<any> {
    const body = {};
    return this.httpClient.post<any>(
      environment.apiUrl + "recetasPorNutriscore",
      body,
    );
  }
}
