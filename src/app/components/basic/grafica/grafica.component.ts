import { Component, OnInit, Input } from '@angular/core';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

// Iniciando módulos:
HighchartsMore(Highcharts);
Highcharts.setOptions({
  lang: {
      decimalPoint: ',',
      thousandsSep: '.'
  }
});

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;

  // Atributos de la gráfica
  @Input() tipoGrafica: string;
  @Input() categorias : string[];
  @Input() ejeY       : string;
  @Input() unidad     : string;
  @Input() series     : [];
  @Input() alto       : number = 300;

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: this.tipoGrafica && this.tipoGrafica != null ? this.tipoGrafica : "spline",
        height: this.alto
      },
      credits: {
        enabled: false
      },
      title: null,
      subtitle: null,
      xAxis: {
        crosshair: true,
        categories: this.categorias
      },
      yAxis: {
        min: 0,
        title: {
          text: this.ejeY && this.ejeY != null ? this.ejeY : ''
        }
      },
      tooltip: {
        headerFormat: '  <span style="font-size:10px"> ' + 
                      '    {point.key} ' + 
                      '  </span>' + 
                      '<table>',
        pointFormat:  '  <tr>' + 
                      '    <td style="color:{series.color}; padding:0">' + 
                      '      <b>{series.name}:</b>&nbsp;' + 
                      '    </td>' +  
                      '    <td style="padding:0">' + 
                      '      <b> ' + 
                      '        {point.y:,.2f} ' + 
                                (this.unidad != null ? this.unidad : '') + 
                      '      </b>' + 
                      '    </td>' + 
                      '  </tr>',
        footerFormat: '  <tr>' + 
                      '    <td colspan="2" style="padding:0">' + 
                      '      <br /> <b><i>{series.options.custom.description}</i></b>' + 
                      '    </td>' +
                      '  </tr>' +
                      '</table>',
        // shared: true,
        useHTML: true
      },
      series: this.series
    };
  }

}
