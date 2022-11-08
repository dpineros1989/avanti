import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BusquedaDatosAbiertosComponent } from './pages/busqueda-datos-abiertos/busqueda-datos-abiertos.component';
import { EntidadComponent } from './pages/entidad/entidad.component';
import { ComponenteComponent } from './pages/componente/componente.component';
import { IndicadoresComponent } from './components/complex/indicadores/indicadores.component';
import { IndicadorComponent } from './components/complex/indicador/indicador.component';
import { LoginComponent } from './pages/login/login.component';
import { CargueSeguimientoComponent } from './pages/cargue-seguimiento/cargue-seguimiento.component';
import { AuthGuard } from './guards/auth.guard';
import { GestionEntidadesComponent } from './pages/gestion-entidades/gestion-entidades.component';


const routes: Routes = [
  // Rutas públicas
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio/:vigencia', component: InicioComponent },
  { path: 'bdatosabiertos/:vigencia', component: BusquedaDatosAbiertosComponent },
  { path: 'entidad/:vigencia/:entidad', component: EntidadComponent },
  { path: 'componente/:componente/vigencia/:vigencia', component: ComponenteComponent },
  { path: 'metas/:vigencia/entidad/:entidad', component: IndicadoresComponent},
  { path: 'metas/:vigencia/componente/:componente', component: IndicadoresComponent},
  { path: 'meta/:id', component: IndicadorComponent},
  { path: 'login', component: LoginComponent },
  // Rutas protegidas
  { path: 'cargues', 
    component: CargueSeguimientoComponent, 
    canActivate: [ AuthGuard ],
    data: {
      roles: ['ENTIDAD']
    } },
  { path: 'entidades',
    component: GestionEntidadesComponent,
    canActivate: [ AuthGuard ],
    data: {
      roles: ['ADMIN']
    } }, 
  // Redirección a inicio
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
