import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosAbiertosService {

  private URL = `${environment.apiUrl}/abiertos`;

  constructor(private http: HttpClient) { }

  buscarDatosAbiertos$(vigenciaId: number, entidadId: number, 
          componenteId: number, nombreArchivo: string): Observable<Object> {
      
      if (!entidadId) {
        entidadId = 0;
      }
      if (!componenteId) {
        componenteId = 0;
      }
      if (!nombreArchivo || nombreArchivo.length === 0) {
      nombreArchivo = '0';
      }
      
      return this.http.get(`${this.URL}/vigencia/${vigenciaId}/entidad/${entidadId}/componente/${componenteId}/archivo/${nombreArchivo.trim()}`);
  }
}
