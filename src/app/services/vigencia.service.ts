import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VigenciaService {

  private URL = `${environment.apiUrl}/vigencias`;

  constructor(private http: HttpClient) { }

  buscarTodas$(): Observable<Object> {
    return this.http.get(`${this.URL}`);
  }

  buscarPorNombre$(nombre: string): Observable<Object> {
    return this.http.get(`${this.URL}/nombre/${nombre}`);
  }

  buscarVigenciaActual$(): Observable<Object> {
    return this.http.get(`${this.URL}/actual`);
  }
}
