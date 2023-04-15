import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente';

@Injectable({
  providedIn: 'root'
})

export class IngredienteService {

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Ingrediente[]> {
    return this.httpClient.get<Ingrediente[]>("http://127.0.0.1:8000/api/ingredientes");
  }
}