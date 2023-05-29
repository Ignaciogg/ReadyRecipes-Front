import { Injectable } from '@angular/core';
import { Colores } from '../models/colores';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private httpClient: HttpClient) { }

  public recibirColores(): Observable<Colores[]> {
    return this.httpClient.get<Colores[]>(environment.apiUrl + "getColores");
  }

  public cambiarPrincipal(nuevoColor: string): Observable<void> {
    const body = {
      color: nuevoColor,
    }
    return this.httpClient.post<void>(
      environment.apiUrl + "setPrincipal",
      body
    );
  }

  public cambiarClaro(nuevoColor: string): Observable<void> {
    const body = {
      color: nuevoColor,
    }
    return this.httpClient.post<void>(
      environment.apiUrl + "setClaro",
      body
    );
  }

  public cambiarSecundario(nuevoColor: string): Observable<void> {
    const body = {
      color: nuevoColor,
    }
    return this.httpClient.post<void>(
      environment.apiUrl + "setSecundario",
      body
    );
  }
}
