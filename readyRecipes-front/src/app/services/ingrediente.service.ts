import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class IngredienteService {

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Ingrediente[]> {
    return this.httpClient.get<Ingrediente[]>(
      environment.apiUrl + "ingredientes",
      { responseType:'json' }
    );
  }
}