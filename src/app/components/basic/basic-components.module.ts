import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HighchartsChartModule } from 'highcharts-angular';

import { GraficaComponent } from './grafica/grafica.component';
import { GraficaGaugeCircularComponent } from './grafica-gauge-circular/grafica-gauge-circular.component';
import { DosDecimalesPipe } from '../../pipes/dos-decimales.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { PieceraComponent } from './piecera/piecera.component';
import { AppRoutingModule } from '../../app-routing.module';
import { BotonTableroComponent } from './boton-tablero/boton-tablero.component';
import { HtmlSeguroPipe } from 'src/app/pipes/html-seguro.pipe';
import { DatosAbiertosComponent } from './datos-abiertos/datos-abiertos.component';
import { GraficaMultiAxisComponent } from './grafica-multi-axis/grafica-multi-axis.component';


@NgModule({
  declarations: [
    DosDecimalesPipe,
    HtmlSeguroPipe, 
    
    BotonTableroComponent, 
    DatosAbiertosComponent,
    GraficaComponent, 
    GraficaGaugeCircularComponent, 
    GraficaMultiAxisComponent, 
    NavbarComponent, 
    PieceraComponent, 
    ],
  imports: [
    CommonModule,
    ScrollingModule,
    HighchartsChartModule,
    AppRoutingModule
  ],
  exports: [
    DosDecimalesPipe,
    HtmlSeguroPipe,

    BotonTableroComponent, 
    DatosAbiertosComponent,
    GraficaComponent, 
    GraficaGaugeCircularComponent, 
    GraficaMultiAxisComponent,
    NavbarComponent, 
    PieceraComponent
  ],
  providers: [
    DecimalPipe,
    DosDecimalesPipe
  ]
})
export class BasicComponentsModule { }
