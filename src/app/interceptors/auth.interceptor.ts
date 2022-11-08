import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import { Usuario } from '../models/usuario.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('avantiUser') != null) {
        const usuario: Usuario = JSON.parse(localStorage.getItem('avantiUser'));

        if (usuario && usuario.token) {
            let headers = new HttpHeaders({
                "Authorization": `Bearer ${usuario.token}`
              });
            const authRequest = request.clone({ headers: headers });
            return next.handle(authRequest);
        }
    }

    return next.handle(request);
  }
}