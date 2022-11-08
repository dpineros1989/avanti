import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AvanceGlobalModel } from '../models/avance-global.model';


@Injectable({
  providedIn: 'root'
})
export class EntidadService {
    private URL = `${environment.apiUrl}/entidades`;
  
    constructor(private http: HttpClient) { }

  buscarTodos$(corteId: number): Observable<Object> {
      return this.http.get(`${this.URL}/corte/${corteId}`);
  }

  buscarPorSigla$(entidad: string): Observable<Object> {
      return this.http.get(`${this.URL}/sigla/${entidad}`);
  }

  buscarAvances$(vigenciaId: number, entidadId: number, divididoMillones?: boolean): Observable<Object> {
      if (!divididoMillones) {
          return this.http.get(`${this.URL}/${entidadId}/avances/vigencia/${vigenciaId}`);
      }

      return this.http.get(`${this.URL}/${entidadId}/avances/vigencia/${vigenciaId}`).pipe(
          map((avances: AvanceGlobalModel[]) => {
              this.dividirAMillones(avances);
              return avances;
          })
      );
      
  }

  private dividirAMillones(avances: AvanceGlobalModel[]) {
    avances.forEach(avance => {
        avance.presupuestoVigente   = avance.presupuestoVigente / 1000000;
        avance.presupuestoEjecucion = avance.presupuestoEjecucion / 1000000;
        avance.presupuestoAprobado  = avance.presupuestoAprobado / 1000000;
    });
}
}
