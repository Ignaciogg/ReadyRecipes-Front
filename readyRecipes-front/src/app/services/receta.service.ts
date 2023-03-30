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

  public get(id: number): Observable<Receta> {
    return this.httpClient.get<Receta>("http://127.0.0.1:8000/api/recetas/get/"+id);
  }
}
