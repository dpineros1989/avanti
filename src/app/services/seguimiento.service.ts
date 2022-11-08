import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguimientoModel } from '../models/seguimiento.model';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  private URL = `${environment.apiUrl}/seguimientos`;

  constructor(private _http: HttpClient) { }

  obtenerSeguimiento$(indicador: number, corte: number): Observable<Object> {
    return this._http.get(`${this.URL}/indicador/${indicador}/corte/${corte}`);
  }

  registrarSeguimiento$(indicador: number, corte: number, seguimiento: SeguimientoModel): Observable<Object> {
    return this._http.post(`${this.URL}/indicador/${indicador}/corte/${corte}`, seguimiento);
  }

  adjuntarArchivoBeneficiarios$(seguimientoId: number, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('archivo', file);

    const request = new HttpRequest('POST', `${this.URL}/${seguimientoId}/archivo-beneficiarios`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    // console.log(request);

    return this._http.request(request);
  }

  obtenerArchivoBeneficiarios$(id: number): Observable<Object> {
    return this._http.get(`${this.URL}/${id}/archivo-beneficiarios`);
  }

  aprobarSeguimiento$(id: number): Observable<Object> {
    return this._http.put(`${this.URL}/${id}/aprobar`, id);
  }

  desaprobarSeguimiento$(id: number): Observable<Object> {
    return this._http.put(`${this.URL}/${id}/desaprobar`, id);
  }
}
