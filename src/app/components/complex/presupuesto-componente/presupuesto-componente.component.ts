import { Component, OnInit, Input } from '@angular/core';
import { ComponenteService } from '../../../services/componente.service';
import { AvanceComponenteModel } from '../../../models/avance-componente.model';
import { CorteModel } from '../../../models/corte.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presupuesto-componente',
  templateUrl: './presupuesto-componente.component.html',
  styleUrls: ['./presupuesto-componente.component.css']
})
export class PresupuestoComponenteComponent implements OnInit {

  private _corteSeleccionado: CorteModel;
  @Input() titulo : string = 'Metas PAD por componente';
  avances         : AvanceComponenteModel[];
  divididoMillones: boolean = true;
  vigencia        : string;
  piecera         : string;

  // Estados
  cargando: boolean = true;
  error   : boolean = false;

  constructor(private router : Router,
              private service: ComponenteService) { }

  /*
  * Getters and setters
  */
  @Input() set corteSeleccionado(valor: CorteModel) {
      this.error    = false;
      this.cargando = true;
      this._corteSeleccionado = valor;
      this.obtenerAvancesEnCorte();
  }
  get corteSeleccionado(): CorteModel {
      return this._corteSeleccionado;
  }

  ngOnInit() { }
  
  obtenerAvancesEnCorte() {
    if (!this.corteSeleccionado) {
        this.error    = true;
        this.cargando = false;
        return;
    }
    
    this.service.buscarAvancesPorCorteParaTodos$(this.corteSeleccionado.id, this.divididoMillones)
        .subscribe((respuesta: AvanceComponenteModel[]) => {
            this.avances = respuesta;
            if (this.avances != null && this.avances.length > 0) {
                this.vigencia = this.avances[0].corte.vigencia.nombre;
                this.piecera = `El presupuesto aprobado se muestra con corte a 
                                ${this.avances[0].corte.nombre.trim().toLowerCase()} de ${this.vigencia}.`;
                this.error    = false;
                this.cargando = false;
            } else {
                this.error    = true;
                this.cargando = false;
            }
        }, (error) => {
            console.log('Error capturado!');
            this.avances = [];
            this.error    = true;
            this.cargando = false;
        });
  }

  verComponente(abreviatura: string) {
    this.router.navigate([
                          'componente',
                          abreviatura.trim().toLowerCase(), 
                          'vigencia', 
                          this.corteSeleccionado.vigencia.nombre.trim()
                        ]);
    
  }

}
