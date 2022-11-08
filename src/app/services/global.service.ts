import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PlurianualModel } from '../models/plurianual.model';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private URL = `${environment.apiUrl}/global`;

  constructor(private http: HttpClient) { }

  buscarAvanceGlobal$(corteId: number) {
    return this.http.get(`${this.URL}/avances/corte/${corteId}`);
  }

  buscarPresupuestoPlurianual$(corteId: number, divididoMillones?: boolean) {
    if (!divididoMillones) {
        return this.http.get(`${this.URL}/plurianual/corte/${corteId}`);
    }

    return this.http.get(`${this.URL}/plurianual/corte/${corteId}`).pipe(
        map((presupuestos: PlurianualModel[]) => {
            this.dividirAMillones(presupuestos);
            return presupuestos;
        })
    );
    
  }

  private dividirAMillones(presupuestos: PlurianualModel[]) {
      presupuestos.forEach(presupuesto => {
          presupuesto.presupuestoPlurianual= presupuesto.presupuestoPlurianual / 1000000;
          presupuesto.presupuestoVigente   = presupuesto.presupuestoVigente / 1000000;
          presupuesto.presupuestoEjecucion = presupuesto.presupuestoEjecucion / 1000000;
          presupuesto.presupuestoAprobado  = presupuesto.presupuestoAprobado / 1000000;
      });
  }
}
