import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  constructor(private httpClient: HttpClient) { }

  public addFavoritos(_id_receta: number, _id_usuario: number): Observable<void> {
    const body = {
      id_receta: _id_receta,
      id_usuario: _id_usuario,
    }
    return this.httpClient.post<void>(
      environment.apiUrl + "addFavoritos",
      body,
    );
  }

  public removeFavoritos(_id_receta: number, _id_usuario: number): Observable<void> {
    return this.httpClient.delete<void>(
      environment.apiUrl + "removeFavoritos/" + _id_receta + "/" + _id_usuario,
    );
  }

  public esFavorito(_id_receta: number, _id_usuario: number): Observable<number> {
    return this.httpClient.get<number>(
      environment.apiUrl + "esFavorito/" + _id_receta + "/" + _id_usuario,
    );
  }
}