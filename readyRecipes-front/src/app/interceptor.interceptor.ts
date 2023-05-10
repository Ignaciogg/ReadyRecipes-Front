import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      setHeaders: { "Authorization": `Bearer ${localStorage.getItem("token") ?? "No-token-found"}` },
    });
    console.log("Enviada la petición:", newRequest);
    return next.handle(newRequest);
  }
}