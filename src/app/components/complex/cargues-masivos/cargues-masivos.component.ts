import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CorteModel } from '../../../models/corte.model';
import { CargueSeguimientoModel } from '../../../models/cargue-seguimiento.model';

@Component({
  selector: 'app-cargues-masivos',
  templateUrl: './cargues-masivos.component.html',
  styleUrls: ['./cargues-masivos.component.css']
})
export class CarguesMasivosComponent implements OnInit {

  @Input() retroalimentar: boolean;
  @Input() ultimoCorte             : CorteModel;
  @Input() cargues                 : CargueSeguimientoModel[] = [];
  cargueSeleccionado               : CargueSeguimientoModel;
  mostrandoRetroalimentacion       : boolean = false;

  constructor() { }

  ngOnInit() { }

  verRetroalimentacion(cargue: CargueSeguimientoModel) {
    if (!cargue) {
      return;
    }
    this.cargueSeleccionado = cargue;
    this.mostrandoRetroalimentacion = true;
  }

  ocultarRetroalimentacion() {
      delete(this.cargueSeleccionado);
      this.mostrandoRetroalimentacion = false;
  }

  /*
  * Getters and setters
  */
  getCargueUrl(cargueId: number): string {
    return `${environment.apiUrl}/cargues/${cargueId}`;
  }
}
