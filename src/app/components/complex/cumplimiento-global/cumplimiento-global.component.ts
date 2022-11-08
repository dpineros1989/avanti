import { Component, OnInit, Input } from '@angular/core';
import { CorteModel } from '../../../models/corte.model';
import { AvanceGlobalModel } from '../../../models/avance-global.model';
import { GlobalService } from '../../../services/global.service';
import { Serie } from '../../../models/serie.model';

@Component({
  selector: 'app-cumplimiento-global',
  templateUrl: './cumplimiento-global.component.html',
  styleUrls: ['./cumplimiento-global.component.css']
})
export class CumplimientoGlobalComponent implements OnInit {

  private _corteSeleccionado: CorteModel;
  @Input() titulo: string = 'Cumplimiento Global';
  avanceGlobal: AvanceGlobalModel;
  vigencia    : string;
  piecera     : string;

  categorias        : string[] = [];
  series            : Serie[] = [];

  // Estados
  cargando: boolean = true;
  error   : boolean = false;

  constructor(private service: GlobalService) { }

  ngOnInit() { }

  obtenerAvanceEnCorte() {
    if (!this.corteSeleccionado) {
        this.error    = true;
        this.cargando = false;
        return;
    }
    this.service.buscarAvanceGlobal$(this.corteSeleccionado.id).subscribe((respuesta: AvanceGlobalModel) => {
        this.avanceGlobal = respuesta;
        if (this.avanceGlobal != null) {
            this.vigencia = this.corteSeleccionado.vigencia.nombre;
            this.piecera = `El % de cumplimiento se muestra con corte a 
                            ${this.corteSeleccionado.nombre.trim().toLowerCase()} de ${this.vigencia}.`;
            this.error    = false;
            this.cargando = false;
        } else {
            this.error    = true;
            this.cargando = false;
        }
    }, (error) => {
        console.log('Error capturado!');
        this.avanceGlobal = null;
        this.error    = true;
        this.cargando = false;
    });
    this.categorias = ['2020-1'];
    this.series = [
        {
          name: 'Actualización aprobada por CDJT',
          data: [626003.99],
          type: 'column',
          color: 'rgb(2, 133, 206)'
        },
        {
          name: 'Vigente',
          data: [614025.01],
          type: 'column',
          color: 'rgb(245, 182, 47)'
        },
        {
          name: 'Ejecutado',
          data: [160969.98],
          type: 'column',
          color: 'rgb(186, 204, 0)'
        },
        {
          name: 'Plurianual',
          data: [335244.23],
          type: 'spline',
          color: 'rgb(224, 1, 9)'
        }
    ];
  }
  

  /*
  * Getters and setters
  */
  @Input() set corteSeleccionado(valor: CorteModel) {
      this.error    = false;
      this.cargando = true;
      this._corteSeleccionado = valor;
      this.obtenerAvanceEnCorte();
  }
  get corteSeleccionado(): CorteModel {
      return this._corteSeleccionado;
  }

}
