import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AvanceGlobalModel } from 'src/app/models/avance-global.model';
import { GraficaAvanceCumplimiento } from 'src/app/models/grafica-avance-cumplimiento.model';


@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableroComponent implements OnInit {
  
  private _rutas     : string[][];
  private _avances   : AvanceGlobalModel[];
  graficaAvanceFisico: GraficaAvanceCumplimiento;
  graficaAvancePptal : GraficaAvanceCumplimiento;

  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit() { }

  cargarAvancesParaGraficar() {
      if (!this.avances || this.avances.length === 0) {
          return;
      }
      
      this.graficaAvanceFisico.titulo = `Avance físico en ${this.avances[0].corte.vigencia.nombre.trim()}`;
      this.graficaAvancePptal.titulo = `Avance presupuestal en ${this.avances[0].corte.vigencia.nombre.trim()}`;
      this.avances.forEach(avance => {
          this.graficaAvanceFisico.categorias.push(avance.corte.nombre);
          this.graficaAvanceFisico.series[0].data.push(avance.fisicoEjecucion);

          this.graficaAvancePptal.categorias.push(avance.corte.nombre);
          this.graficaAvancePptal.series[0].data.push(avance.presupuestoAprobado);
          this.graficaAvancePptal.series[1].data.push(avance.presupuestoVigente);
          this.graficaAvancePptal.series[2].data.push(avance.presupuestoEjecucion);
      });
  }

  inicializarGraficas() {
    this.graficaAvanceFisico = {
        titulo: '',
        categorias: [],
        series    : [{
            name: 'Avance',
            data: [],
            color: 'rgba(83, 73, 134, 0.7)'
        }]
    };
    this.graficaAvancePptal = {
        titulo: '',
        categorias: [],
        series    : [{
            name: 'Ppto aprobado',
            data: [],
            color: 'rgb(2, 133, 206)'
        }, {
            name: 'Ppto vigente',
            data: [],
            color: 'rgb(245, 182, 47)'
        }, {
        name: 'Ppto ejecutado',
        data: [],
        color: 'rgb(186, 204, 0)'
        }]
    };
  }


  /**
   * Getters and setters
   */
  @Input() set rutas(valor: string[][]) {
      this._rutas = valor;
  }
  get rutas(): string[][] {
      return this._rutas;
  }

  @Input() set avances(valor: AvanceGlobalModel[]) {
      this._avances = valor;
      this.inicializarGraficas();
      this.cargarAvancesParaGraficar();
  }
  get avances(): AvanceGlobalModel[] {
      return this._avances;
  }
  
  get cantidadMetas(): number {
      if (!this.avances || this.avances.length === 0 || !this.avances[0]) {
          return 0;
      }
      return this.avances[0].metas;
  }
  
  get avanceFisicoUltimoCorte(): string {
      if (!this.avances || this.avances.length === 0 || !this.avances[this.avances.length - 1]) {
          return '0,00';
      }
      return this.currencyPipe.transform(
        this.avances[this.avances.length - 1].fisicoEjecucion, 'COP', '', '0.2-2', 'es-CO'
      );
  }
  
  get avancePptoVigenteUltimoCorte(): string {
      if (!this.avances || this.avances.length === 0 || !this.avances[this.avances.length - 1]) {
          return '0.00';
      }
      return this.currencyPipe.transform(
        this.avances[this.avances.length - 1].presupuestoVigente, 'COP', '', '0.2-2', 'es-CO'
      );
  }
  
  get avancePptoEjecutadoUltimoCorte(): string {
      if (!this.avances || this.avances.length === 0 || !this.avances[this.avances.length - 1]) {
          return '0.00';
      }
      return this.currencyPipe.transform(
        this.avances[this.avances.length - 1].presupuestoEjecucion, 'COP', '', '0.2-2', 'es-CO'
      );
  }
  
  get nota(): string {
      if (!this.avances || this.avances.length === 0 || !this.avances[this.avances.length - 1]) {
          return '';
      }
      return `La información mostrada corresponde al corte ${this.avances[this.avances.length - 1].corte.nombre.trim().toLowerCase()} de ${this.avances[this.avances.length - 1].corte.vigencia.nombre.trim()}.`;
  }

}