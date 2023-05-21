import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private respuestaSubject: Subject<number> = new Subject<number>();

  constructor(private httpClient: HttpClient) { }

  public registrar(usuario: Usuario): Observable<number> {
    const endpoint: string = environment.apiUrl + "registro";
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

  public me(): Observable<Usuario> {
    return this.httpClient.post<Usuario>(
      environment.apiUrl + "me",
      {},
    );
  }

  public infoUsuario(_id: number): Observable<Usuario> {
    const body = {
      id: _id,
    }
    return this.httpClient.post<Usuario>(
      environment.apiUrl + "infoUsuario",
      body,
    );
  }

  public eliminarUsuario(_correo: string): Observable<void> {
    const body = {
      email: _correo,
    }
    return this.httpClient.post<void>(
      environment.apiUrl + "eliminarUsuario",
      body,
    );
  }

  public numeroUsuarios(): Observable<any> {
    return this.httpClient.get<any>(
      environment.apiUrl + "numeroUsuarios",
    );
  }
}