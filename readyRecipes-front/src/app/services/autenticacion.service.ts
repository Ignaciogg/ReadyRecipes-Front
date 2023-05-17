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
    // setTimeout() => despues de x tiempo, llamar al back refresh() para cambiar el token por uno nuevo
    return this.httpClient.post<Usuario>(
      environment.apiUrl + "login",
      body,
    );
  }

  public logout(): Observable<any> {
    localStorage.setItem("token", "");
    localStorage.setItem("nombre", "");
    localStorage.setItem("email", "");
    return this.httpClient.get<void>(
      environment.apiUrl + "logout",
    );
  }

  public estaLogeado() {
    const token = localStorage.getItem("token");
    return token != "" && token != undefined && token != null;
  }

  public setToken(nuevoToken: string){
    localStorage.setItem("token", nuevoToken);   
  }

  public setNombre(nuevoNombre: string){
    localStorage.setItem("nombre", nuevoNombre);   
  }

  public setEmail(nuevoEmail: string){
    localStorage.setItem("email", nuevoEmail);   
  }

  public getEmail(){
    return localStorage.getItem("email");   
  }
  
  public refrescarToken() {
    // 
  }
}