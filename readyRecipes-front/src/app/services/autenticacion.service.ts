import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    return this.httpClient.post<any>(
      environment.apiUrl + "login",
      body,
    );
  }
  
  public refreshToken(): Observable<any> {
    return this.httpClient.get<any>(
      environment.apiUrl + "refresh",
    );
  }

  public logout(): Observable<void> {
    const estaLogeado = this.estaLogeado();
    this.setId("");
    this.setToken("");
    this.setNombre("");
    this.setEmail("");
    if(estaLogeado) {
      return this.httpClient.get<void>(
        environment.apiUrl + "logout",
      );
    } else {
      return of();
    }
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

  public setAdmin(nuevoAdmin: boolean){
    localStorage.setItem("admin", nuevoAdmin.toString());
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

  public getAdmin(): boolean {
    console.log(localStorage.getItem("admin"));
    return localStorage.getItem("admin") == "true" || localStorage.getItem("admin") == "1";
  }
}