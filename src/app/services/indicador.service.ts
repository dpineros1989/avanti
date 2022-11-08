import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  private URL = `${environment.apiUrl}/indicadores`;

  constructor(private http: HttpClient) { }

  buscarTodosEnEntidad$(corteId: number, entidadId: number): Observable<Object> {
    return this.http.get(`${this.URL}/corte/${corteId}/entidad/${entidadId}/`);
  }

  buscarTodosEnComponente$(corteId: number, componenteId: number): Observable<Object> {
    return this.http.get(`${this.URL}/corte/${corteId}/componente/${componenteId}/`);
  }
}
