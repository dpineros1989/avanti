import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { EntidadModel } from '../models/entidad.model';

interface RespuestaToken {
  token   : string;
  username: string;
  roles   : string[];
  entidad : EntidadModel;  
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = `${environment.apiUrl}/auth`;

  private usuarioActualSubject: BehaviorSubject<Usuario>;
  public usuarioActual: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this.usuarioActualSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('avantiUser')));
    this.usuarioActual = this.usuarioActualSubject.asObservable();
  }

  login(username: string, password: string) {
    localStorage.removeItem('avantiUser');
    
    return this.http.post(`${this.URL}`, { username, password })
      .pipe(map((respuesta: RespuestaToken) => {
        // Guardo datos de usuario y el token en el local storage para mantener datos entre navegación de páginas
        const usuario = new Usuario(respuesta.username, respuesta.roles, respuesta.token, respuesta.entidad);
        localStorage.setItem('avantiUser', JSON.stringify(usuario));
        this.usuarioActualSubject.next(usuario);
        return usuario;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('avantiUser');
    this.usuarioActualSubject.next(null);
  }

  /*
  * Getters and setters
  */
  public get usuarioActualAsUsuario(): Usuario {
    return this.usuarioActualSubject.value;
  }
}
