import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private respuestaSubject: Subject<number> = new Subject<number>();

  constructor(private httpClient: HttpClient) { }

  public registrar(usuario: Usuario): Observable<number> {
    const endpoint: string = "http://127.0.0.1:8000/api/registro";
    this.httpClient.post<number>(endpoint, usuario).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error en el registro:', error);
        this.respuestaSubject.next(error.status);
        return throwError(() => new Error('Ha ocurrido un error en la solicitud'));
      })
    ).subscribe((data: number) => {
      this.respuestaSubject.next(data);
    });
    return this.respuestaSubject.asObservable();
  }

  public login(usuario: Usuario): Observable<number> {
    const endpoint: string = "http://127.0.0.1:8000/api/login";
    const parametros = {
      email: usuario.email,
      pass: usuario.pass,
    }
    this.httpClient.post<number>(endpoint, parametros).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error en el registro:', error);
        this.respuestaSubject.next(error.status);
        return throwError(() => new Error('Ha ocurrido un error en la solicitud'));
      })
    ).subscribe((data: number) => {
      this.respuestaSubject.next(data);
    });
    return this.respuestaSubject.asObservable();
  }
}
