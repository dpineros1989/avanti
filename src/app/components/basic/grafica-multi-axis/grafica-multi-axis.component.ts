import { Component, OnInit, Input } from '@angular/core';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { Serie } from '../../../models/serie.model';


// Iniciando módulos:
HighchartsMore(Highcharts);
Highcharts.setOptions({
  lang: {
      decimalPoint: ',',
      thousandsSep: '.'
  }
});

@Component({
  selector: 'app-grafica-multi-axis',
  templateUrl: './grafica-multi-axis.component.html',
  styleUrls: ['./grafica-multi-axis.component.css']
})
export class GraficaMultiAxisComponent implements OnInit {

  highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;

  // Atributos de la gráfica
  @Input() tipoGrafica: string;
  @Input() categorias : string[];
  @Input() ejesY      : string[];
  @Input() series     : Serie[];
  @Input() alto       : number = 300;

  ngOnInit() {

    this.chartOptions = {
        chart: {
            zoomType: 'xy',
            height: this.alto
        },
        credits: {
            enabled: false
        },
        title: null,
        subtitle: null,
        xAxis: {
            categories: this.categorias
        },
        yAxis: [{ // Eje Y principal
            min: 0,
            title: {
                text: this.ejesY && this.ejesY.length >= 1 ? this.ejesY[0] : '',
            },
        }, { // Eje Y secundario
            min: 0,
            max: 100,
            title: {
              text: this.ejesY && this.ejesY.length >= 2 ? this.ejesY[1] : '',
            },
            opposite: true
          }],
          tooltip: {
            headerFormat: '  <span style="font-size:1.1em"> ' + 
                          '    {point.key} ' + 
                          '  </span>' + 
                          '<table>',
            pointFormat:  '  <tr>' + 
                          '    <td style="color:{series.color}; padding:0">' + 
                          '      <b>{series.name}:</b>&nbsp;' + 
                          '    </td>' +  
                          '    <td style="padding:0">' + 
                          '      <b> ' + 
                          '        {point.y} ' + 
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
        // tooltip: {
        //     shared: true
        // },
        series: this.series
    };
    // console.log(this.series);
  }
  

}

