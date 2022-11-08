import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData, CurrencyPipe } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ComplexComponentsModule } from './components/complex/complex-components.module';
import { BasicComponentsModule } from './components/basic/basic-components.module';

import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BusquedaDatosAbiertosComponent } from './pages/busqueda-datos-abiertos/busqueda-datos-abiertos.component';
import { EntidadComponent } from './pages/entidad/entidad.component';
import { ComponenteComponent } from './pages/componente/componente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { CargueSeguimientoComponent } from './pages/cargue-seguimiento/cargue-seguimiento.component';
import { CargueService } from './services/cargue.service';
import { NgDropFileDirective } from './directives/ng-drop-file.directive';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { GestionEntidadesComponent } from './pages/gestion-entidades/gestion-entidades.component';

registerLocaleData(localeEsCO);

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BusquedaDatosAbiertosComponent,
    EntidadComponent,
    ComponenteComponent,
    LoginComponent,
    CargueSeguimientoComponent,
    GestionEntidadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BasicComponentsModule,
    ComplexComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    
  ],
  providers: [
    CurrencyPipe,
    CargueService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
