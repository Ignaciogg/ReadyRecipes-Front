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

  public login(_email: string, _pass: string): Observable<any> {
    const body = {
      email: _email,
      pass: _pass,
    }
    // setTimeout() => despues de x tiempo, llamar al back refresh() para cambiar el token por uno nuevo
    return this.httpClient.post<any>(
      environment.apiUrl + "login",
      body,
    );
  }

  public logout(): Observable<any> {
    this.setId("");
    this.setToken("");
    this.setNombre("");
    this.setEmail("");
    return this.httpClient.get<void>(
      environment.apiUrl + "logout",
    );
  }

  public estaLogeado() {
    const token = localStorage.getItem("token");
    return token != "" && token != undefined && token != null;
  }

  public setId(nuevoId: string){
    localStorage.setItem("id", nuevoId);   
  }

  public setToken(nuevoToken: string){
    localStorage.setItem("token", nuevoToken);   
  }
  
  public setNombre(nuevoNombre: string){
    localStorage.setItem("nombre", nuevoNombre);   
  }

  public setApellidos(nuevosApellidos: string){
    localStorage.setItem("apellidos", nuevosApellidos);   
  }
  
  public setEmail(nuevoEmail: string){
    localStorage.setItem("email", nuevoEmail);   
  }
  
  public getId(): string {
    return localStorage.getItem("id") || "";
  }

  public getToken(): string {
    return localStorage.getItem("token") || "";
  }

  public getNombre(): string {
    return localStorage.getItem("nombre") || "";
  }
  
  public getEmail(): string {
    return localStorage.getItem("email") || "";   
  }
  
  public refrescarToken() {
    // 
  }
}