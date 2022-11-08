import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CargueService {
  private URL = `${environment.apiUrl}/cargues`;

  constructor(private _http: HttpClient) { }

  obtenerCargues$(corteId: number): Observable<Object> {
    return this._http.get(`${this.URL}/corte/${corteId}`);
  }

  obtenerCarguesPorEntidad$(corteId: number, entidadId: number): Observable<Object> {
    return this._http.get(`${this.URL}/corte/${corteId}/entidad/${entidadId}`);
  }

  obtenerCargue$(id: number): Observable<Object> {
    return this._http.get(`${this.URL}/${id}`);
  }

  cargarSeguimiento$(corte: number, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('archivo', file);

    const request = new HttpRequest('POST', `${this.URL}/corte/${corte}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    // console.log(request);

    return this._http.request(request);
  }

  retroalimentar$(cargueId: number, retroalimentacion: string): Observable<Object> {
    return this._http.put(`${this.URL}/${cargueId}/retroalimentar`, retroalimentacion);
  }

  retroalimentarConCorreo$(cargueId: number, retroalimentacion: string): Observable<Object> {
    return this._http.put(`${this.URL}/${cargueId}/retroalimentar-con-correo`, retroalimentacion);
  }

  aprobar$(cargueId: number, retroalimentacion: string): Observable<Object> {
    return this._http.put(`${this.URL}/${cargueId}/aprobar`, retroalimentacion);
  }

  aprobarConCorreo$(cargueId: number, retroalimentacion: string): Observable<Object> {
    return this._http.put(`${this.URL}/${cargueId}/aprobar-con-correo`, retroalimentacion);
  }
}
