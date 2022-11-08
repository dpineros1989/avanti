import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponentsModule } from '../basic/basic-components.module';

import { EtiquetaPipe } from '../../pipes/etiqueta.pipe';

import { CumplimientoGlobalComponent } from './cumplimiento-global/cumplimiento-global.component';
import { IndicadorComponent } from './indicador/indicador.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { MapaDistritalComponent } from './mapa-distrital/mapa-distrital.component';
import { PresupuestoComponenteComponent } from './presupuesto-componente/presupuesto-componente.component';
import { PresupuestoPlurianualComponent } from './presupuesto-plurianual/presupuesto-plurianual.component';
import { TableroComponent } from './tablero/tablero.component';
import { CargandoComponent } from '../basic/cargando/cargando.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CarguesMasivosComponent } from './cargues-masivos/cargues-masivos.component';
import { RetroalimentacionComponent } from './retroalimentacion/retroalimentacion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroSeguimientoComponent } from './registro-seguimiento/registro-seguimiento.component';
import { NgDropFileDirective } from 'src/app/directives/ng-drop-file.directive';


@NgModule({
  declarations: [
    EtiquetaPipe, 

    CargandoComponent,
    CumplimientoGlobalComponent, 
    IndicadorComponent, 
    IndicadoresComponent, 
    MapaDistritalComponent, 
    PresupuestoComponenteComponent, 
    PresupuestoPlurianualComponent, 
    TableroComponent, 
    CarguesMasivosComponent, 
    RetroalimentacionComponent, 
    RegistroSeguimientoComponent, 
    NgDropFileDirective
    ],
  imports: [
    CommonModule,
    ScrollingModule,
    AppRoutingModule,
    BasicComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    CargandoComponent, 
    CarguesMasivosComponent,
    CumplimientoGlobalComponent, 
    IndicadorComponent, 
    IndicadoresComponent, 
    MapaDistritalComponent, 
    PresupuestoComponenteComponent, 
    PresupuestoPlurianualComponent, 
    RetroalimentacionComponent,
    TableroComponent,
    NgDropFileDirective
  ]
})
export class ComplexComponentsModule { }
