import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  constructor(private httpClient: HttpClient) { }

  public addFavoritos(_id_receta: number): Observable<void> {
    return this.httpClient.get<void>(
      environment.apiUrl + "addFavoritos/" + _id_receta,
    );
  }

  public removeFavoritos(_id_receta: number): Observable<void> {
    return this.httpClient.delete<void>(
      environment.apiUrl + "removeFavoritos/" + _id_receta,
    );
  }

  public esFavorito(_id_receta: number): Observable<number> {
    return this.httpClient.get<number>(
      environment.apiUrl + "esFavorito/" + _id_receta,
    );
  }
}