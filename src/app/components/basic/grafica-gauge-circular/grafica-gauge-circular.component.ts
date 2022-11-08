import { Component, OnInit, Input } from '@angular/core';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

// Iniciando módulos:
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
Highcharts.setOptions({
  lang: {
      decimalPoint: ',',
      thousandsSep: '.'
  }
});

@Component({
  selector: 'app-grafica-gauge-circular',
  templateUrl: './grafica-gauge-circular.component.html',
  styleUrls: ['./grafica-gauge-circular.component.css']
})
export class GraficaGaugeCircularComponent implements OnInit {

  highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;

  // Atributos de la gráfica
  @Input() tipoGrafica       : string;
  @Input() referencia        : number;
  @Input() etiquetaReferencia: string;
  @Input() valor             : number;
  @Input() etiquetaValor     : string;
  @Input() unidad            : string;
  @Input() alto              : string = '100%';

  titulo = '';

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      chart: {
            type: 'solidgauge',
            height: this.alto
        },
        credits: {
          enabled: false
        },
        title: null,
        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '10px'
            },
            valueSuffix: (this.unidad != null ? this.unidad : '%'),
            pointFormat: '<div> ' + 
                          '  <span style="font-weight: bold; width: 100% !important;"> ' + 
                          '  {series.name} ' + 
                          '  </span> ' + 
                          '  <br> ' + 
                          '  <span style="font-size:2em; color: {point.color}; font-weight: bold"> ' + 
                          '    {point.y}' +
                          '  </span>' + 
                          '</div> ',
            positioner: function (labelWidth) {
                return {
                    x: (this.chart.chartWidth - labelWidth) / 2,
                    y: (this.chart.plotHeight / 2) - 15
                };
            }
        },
    
        pane: {
            startAngle: 0,
            endAngle: 360,
            // size: this.alto,
            size: '100%',
            background: [{ // Ejecución
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: 'rgba(186, 204, 0, 0.3)',
                borderWidth: 0
            }, { // Progaramación
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: 'rgba(245, 182, 47, 0.3)',
                borderWidth: 0
            }]
        },
        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: []
      },
  
      plotOptions: {
          solidgauge: {
              dataLabels: {
                  enabled: false
              },
              linecap: 'round',
              stickyTracking: false,
              rounded: true
          }
      },
  
      series: [{
          name: this.etiquetaValor && this.etiquetaValor != null ? this.etiquetaValor : 'Ejecución',
          data: [{
              color: 'rgb(186, 204, 0)',
              radius: '87%',
              innerRadius: '63%',
              y: this.valor && this.valor != null ? this.valor : 0
          }]
      }, {
          name: this.etiquetaReferencia && this.etiquetaReferencia != null ? this.etiquetaReferencia : 'Programación',
          data: [{
              color: 'rgb(245, 182, 47)',
              radius: '62%',
              innerRadius: '38%',
              y: this.referencia && this.referencia != null ? this.referencia : 0
          }]
      }]
    }
  }

}