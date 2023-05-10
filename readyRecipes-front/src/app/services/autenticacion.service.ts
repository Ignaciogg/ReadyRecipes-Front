import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public login(usuario: Usuario): Observable<any> {
    const body = {
      email: usuario.email,
      pass: usuario.pass,
    }
    return this.httpClient.post<Usuario>(
      environment.apiUrl + "login",
      body,
    );
  }

  public logut() {
    // eliminar token de localstorage
  }

  public estaLogeado() {
    return false; /*si existe token*/
  }
  
    public refrescarToken() {
      // 
    }
}