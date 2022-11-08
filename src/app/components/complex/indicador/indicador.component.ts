import { Component, OnInit, Input } from '@angular/core';
import { CorteService } from '../../../services/corte.service';
import { IndicadorModel } from '../../../models/indicador.model';
import { GraficaAvanceCumplimiento } from '../../../models/grafica-avance-cumplimiento.model';
import { CorteModel } from '../../../models/corte.model';
import { DosDecimalesPipe } from 'src/app/pipes/dos-decimales.pipe';

@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.css']
})
export class IndicadorComponent implements OnInit {

  private _indicador : IndicadorModel;
  cortes             : CorteModel[] = [];
  graficaAvanceFisico: GraficaAvanceCumplimiento;
  graficaAvancePptal : GraficaAvanceCumplimiento;
  cargando           : boolean;

  constructor(private corteService: CorteService,
              private ddPipe      : DosDecimalesPipe) { }

  ngOnInit() {
  }

  cargarAvancesParaGraficar() {
      if (!this.indicador) {
          return;
      }
      this.corteService.buscarTodos$(this.indicador.vigencia.id).subscribe((respuesta: CorteModel[]) => {
          this.cargando = true;
          this.inicializarGraficas();
          this.cortes = respuesta;
          this.cortes.forEach(corte => {
              this.graficaAvanceFisico.categorias.push(corte.nombre);
              this.graficaAvancePptal.categorias.push(corte.nombre);

              const seguimiento = 
                  this.indicador.seguimientos.find(item => item.corte.nombre.trim() === corte.nombre.trim());
              if (seguimiento) {
                  // Avance Físico  
                  this.graficaAvanceFisico.series[0].data.push(
                      this.ddPipe.transform(
                          seguimiento.fisicoVigente >= 0 ? seguimiento.fisicoVigente : null
                      )
                  );
                  this.graficaAvanceFisico.series[1].data.push(
                      this.ddPipe.transform(
                          seguimiento.fisicoEjecucion >= 0 ? seguimiento.fisicoEjecucion : null 
                      )
                  );
                  this.graficaAvanceFisico.series[2].data.push(
                      this.ddPipe.transform(
                          this.calcularPorcentaje(seguimiento.fisicoVigente, seguimiento.fisicoEjecucion)
                      )
                  );
                  // Avance presupuestal
                  this.graficaAvancePptal.series[0].data.push(
                      this.ddPipe.transform( 
                        this.indicador.metaPresupuestal >= 0 ? this.indicador.metaPresupuestal / 1000000 : null
                      )
                  );
                  this.graficaAvancePptal.series[1].data.push(
                      this.ddPipe.transform(
                          seguimiento.presupuestoVigente >= 0 ? seguimiento.presupuestoVigente / 1000000 : null
                      )
                  );
                  this.graficaAvancePptal.series[2].data.push(
                      this.ddPipe.transform(
                          seguimiento.presupuestoEjecucion >= 0 ? seguimiento.presupuestoEjecucion / 1000000 : null
                      )
                  );
                  this.graficaAvancePptal.series[3].data.push(
                      this.ddPipe.transform(
                          this.calcularPorcentaje(seguimiento.presupuestoVigente, seguimiento.presupuestoEjecucion)
                      )
                  );
              } else {
                  this.graficaAvanceFisico.series[0].data.push(0);
                  this.graficaAvanceFisico.series[1].data.push(null);
                  this.graficaAvanceFisico.series[2].data.push(null);
                  this.graficaAvancePptal.series[0].data.push(0);
                  this.graficaAvancePptal.series[1].data.push(null);
                  this.graficaAvancePptal.series[2].data.push(null);
              }
          });
          this.graficaAvanceFisico.titulo = `Avance físico en ${this.indicador.vigencia.nombre}`;
          this.graficaAvancePptal.titulo = `Avance presupuestal en ${this.indicador.vigencia.nombre}`;
          this.cargando = false;
      }, (error) => {
          this.cargando = false;
      });
  }

  inicializarGraficas() {
    this.graficaAvanceFisico = {
        titulo: '',
        categorias: [],
        series    : [
        {
            name: 'Vigente',
            custom: {
              description: 'Meta física asociada al PAD y aprobada en Comité Distrital de Justicia Transicional',
            },
            data: [],
            type: 'column',
            color: 'rgb(245, 182, 47)',
            tooltip: {
                valueSuffix: ` ${this.indicador.unidadMedida}`
            },
        }, {
            name: 'Ejecutado',
            custom: {
              description: 'Meta física asociada al PAD y ejecutada por la entidad Distrital para la vigencia reportada',
            },
            data: [],
            type: 'column',
            color: 'rgb(186, 204, 0)',
            tooltip: {
                valueSuffix: ` ${this.indicador.unidadMedida}`
            },
        }, {
            name: 'Avance',
            data: [],
            type: 'spline',
            color: 'rgba(83, 73, 134, 0.7)',
            tooltip: {
              valueSuffix: ' %'
            },
            yAxis: 1
        }]
    };
    this.graficaAvancePptal = {
        titulo: '',
        categorias: [],
        series    : [
        {
            name: 'Ppto inicial',
            custom: {
              description: 'Presupuesto asociado al PAD aprobado en Comité Distrital de Justicia Transicional',
            },
            data: [],
            type: 'column',
            color: 'rgb(2, 133, 206)',
            tooltip: {
                valueSuffix: ' millones'
            }
        },
        {
            name: 'Ppto vigente',
            custom: {
              description: 'Presupuesto asociado al PAD y definido por la entidad Distrital para la vigencia fiscal',
            },
            data: [],
            type: 'column',
            color: 'rgb(245, 182, 47)',
            tooltip: {
              valueSuffix: ' millones'
            }
        }, {
            name: 'Ppto ejecutado',
            custom: {
              description: 'Presupuesto asociado al PAD ejecutado por la entidad Distrital para la vigencia reportada',
            },
            data: [],
            type: 'column',
            color: 'rgb(186, 204, 0)',
            tooltip: {
              valueSuffix: ' millones'
            }
        }, {
            name: 'Avance',
            data: [],
            type: 'spline',
            color: 'rgba(83, 73, 134, 0.7)',
            tooltip: {
              valueSuffix: ' %'
            },
            yAxis: 1
        }]
    };
  }

//   TODO: Revisar este calculo con el valor de la SQL
  private calcularPorcentaje(vigente: number, ejecutado: number): number {
    if (!vigente || vigente == null || !ejecutado || ejecutado == null) {
        return 0;
    }
    if (vigente < 0) {
        if (ejecutado > 0) {
            return 100;
        } else {
            return 0;
        }
    } else if (vigente > 0) {
        if (ejecutado >= vigente) {
            return 100;
        } else if (ejecutado > 0 && ejecutado < vigente) {
            return ejecutado / vigente * 100;
        } else {
            return 0;
        }
    } else {
        if (ejecutado > 0) {
            return 100;
        } else {
            return 0;
        }
    }
  }

  /*
  * Getters and setters
  */
  @Input() set indicador(valor: IndicadorModel) {
      this.cargando = true;
      this._indicador = valor;
      this.cargarAvancesParaGraficar();
  }
  get indicador(): IndicadorModel {
      return this._indicador;
  }

}
