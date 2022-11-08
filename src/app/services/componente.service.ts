import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AvanceComponenteModel } from '../models/avance-componente.model';


@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  private URL = `${environment.apiUrl}/componentes`;

  constructor(private http: HttpClient) {}

  buscarTodos$(): Observable<Object> {
    return this.http.get(`${this.URL}`);
  }

  buscarPorAbreviatura$(abreviatura: string): Observable<Object> {
    return this.http.get(`${this.URL}/abreviatura/${abreviatura}`);
  }

  buscarAvancesPorVigenciaParaComponente$(vigenciaId: number, componenteId: number, divididoMillones?: boolean): Observable<Object> {
    if (!divididoMillones) {
      return this.http.get(`${this.URL}/${componenteId}/avances/vigencia/${vigenciaId}`);
    }

    return this.http.get(`${this.URL}/${componenteId}/avances/vigencia/${vigenciaId}`).pipe(
        map((avances: AvanceComponenteModel[]) => {
            this.dividirAMillones(avances);
            return avances;
        })
    );
  }

  buscarAvancesPorCorteParaTodos$(corteId: number, divididoMillones?: boolean): Observable<Object> {
    if (!divididoMillones) {
      return this.http.get(`${this.URL}/avances/corte/${corteId}`);
    }

    return this.http.get(`${this.URL}/avances/corte/${corteId}`).pipe(
        map((avances: AvanceComponenteModel[]) => {
            this.dividirAMillones(avances);
            return avances;
        })
    );
  }

  private dividirAMillones(avances: AvanceComponenteModel[]) {
      avances.forEach(avance => {
          avance.presupuestoVigente   = avance.presupuestoVigente / 1000000;
          avance.presupuestoEjecucion = avance.presupuestoEjecucion / 1000000;
          avance.presupuestoAprobado  = avance.presupuestoAprobado / 1000000;
      });
  }
}
