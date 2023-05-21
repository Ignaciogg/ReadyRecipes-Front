import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './services/autenticacion.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  private autenticacionService: AutenticacionService;
  
  constructor(
    autenticacionService: AutenticacionService,
  ) {
    this.autenticacionService = autenticacionService;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      setHeaders: { "Authorization": `Bearer ${this.autenticacionService.getToken() ?? "No-token-found"}` },
    });
    return next.handle(newRequest);
  }
}