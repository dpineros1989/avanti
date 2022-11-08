import { Component, OnInit, Input } from '@angular/core';
import { Serie } from '../../../models/serie.model';
import { CorteModel } from '../../../models/corte.model';
import { GlobalService } from '../../../services/global.service';
import { PlurianualModel } from '../../../models/plurianual.model';

@Component({
  selector: 'app-presupuesto-plurianual',
  templateUrl: './presupuesto-plurianual.component.html',
  styleUrls: ['./presupuesto-plurianual.component.css']
})
export class PresupuestoPlurianualComponent implements OnInit {

  private _corteSeleccionado: CorteModel;
  @Input() titulo   : string = 'Presupuesto Plurianual';
  piecera           : string;
  categorias        : string[] = [];
  series            : Serie[] = [];
  datosPlurianual   : number[] = [];
  datosPptoAprobado : number[] = [];
  datosPptoVigente  : number[] = [];
  datosPptoEjecutado: number[] = [];

  // Estados
  cargando: boolean = true;
  error   : boolean = false;

  constructor(private service: GlobalService) { }

  /*
  * Getters and setters
  */
  @Input() set corteSeleccionado(valor: CorteModel) {
      this._corteSeleccionado = valor;
      this.error    = false;
      this.cargando = true;
      this.limpiarDatos();
      this.obtenerPadPlurianual();
  }
  get corteSeleccionado(): CorteModel {
      return this._corteSeleccionado;
  }

  ngOnInit() { }

  /*
  * Methods
  */
 obtenerPadPlurianual() {
    if (!this.corteSeleccionado) {
        this.error    = true;
        this.cargando = false;
        return;
    }
    this.service.buscarPresupuestoPlurianual$(this.corteSeleccionado.id, true).subscribe((respuesta: PlurianualModel[]) => {
        if (respuesta != null) {
            respuesta.forEach(item => {
                this.categorias.push(item.vigencia.nombre);
                this.datosPlurianual.push(item.presupuestoPlurianual);
                this.datosPptoAprobado.push(item.presupuestoAprobado);
                this.datosPptoVigente.push(item.presupuestoVigente);
                this.datosPptoEjecutado.push(item.presupuestoEjecucion);
            });
            this.series = [
                {
                  name: 'Presupuesto inicial',
                  custom: {
                    description: 'Presupuesto asociado al PAD aprobado en Comité Distrital de Justicia Transicional',
                  },
                  data: this.datosPptoAprobado,
                  type: 'column',
                  color: 'rgb(2, 133, 206)'
                },
                {
                  name: 'Vigente',
                  custom: {
                    description: 'Presupuesto asociado al PAD y definido por la entidad Distrital para la vigencia fiscal',
                  },
                  data: this.datosPptoVigente,
                  type: 'column',
                  color: 'rgb(245, 182, 47)'
                },
                {
                  name: 'Ejecutado',
                  custom: {
                    description: 'Presupuesto asociado al PAD ejecutado por la entidad Distrital para la vigencia reportada',
                  },
                  data: this.datosPptoEjecutado,
                  type: 'column',
                  color: 'rgb(186, 204, 0)'
                },
                {
                  name: 'Plurianual',
                  data: this.datosPlurianual,
                  type: 'spline',
                  color: 'rgb(224, 1, 9)'
                }
            ];
            this.piecera = `La información se muestra con corte a  
                            ${this.corteSeleccionado.nombre.trim().toLowerCase()} de 
                            ${this.corteSeleccionado.vigencia.nombre}.`;
            this.error    = false;
            this.cargando = false;
        } else {
            this.limpiarDatos();
            this.error    = true;
            this.cargando = false;
        }
    }, (error) => {
        console.log('Error capturado!');
        this.limpiarDatos();
        this.error    = true;
        this.cargando = false;
    });
  }

  private limpiarDatos() {
      this.categorias         = [];
      this.series             = [];
      this.datosPlurianual    = [];
      this.datosPptoAprobado  = [];
      this.datosPptoVigente   = [];
      this.datosPptoEjecutado = [];
  }

}
