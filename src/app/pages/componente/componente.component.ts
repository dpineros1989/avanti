import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosAbiertosService } from '../../services/datos-abiertos.service';
import { ComponenteService } from '../../services/componente.service';
import { VigenciaService } from '../../services/vigencia.service';
import { ComponenteModel } from '../../models/componente.model';
import { AvanceGlobalModel } from '../../models/avance-global.model';
import { DatoAbiertoModel } from '../../models/dato-abierto.model';
import { VigenciaModel } from '../../models/vigencia.model';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.css']
})
export class ComponenteComponent implements OnInit {

  avances       : AvanceGlobalModel[] = [];
  datos         : DatoAbiertoModel[] = [];
  componente    : ComponenteModel;
  vigencia      : VigenciaModel;

  // Estados
  cargandoTablero      : boolean = false;
  errorEnTablero       : boolean = false;
  cargandoDatosAbiertos: boolean = false;
  errorEnDatosAbiertos : boolean = false;

  constructor(private route          : ActivatedRoute,
              private service        : ComponenteService,
              private vigenciaService: VigenciaService,
              private daService      : DatosAbiertosService) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.cargandoTablero       = true;
          this.errorEnTablero        = false;
          this.cargandoDatosAbiertos = true;
          this.errorEnDatosAbiertos  = false;

          if (!params['vigencia'] || !params['componente']) {
              this.datos   = [];
              this.avances = [];
              this.cargandoTablero       = false;
              this.errorEnTablero        = true;
              this.cargandoDatosAbiertos = false;
              this.errorEnDatosAbiertos  = true;
              return;
          }
          this.vigenciaService.buscarPorNombre$(params['vigencia']).subscribe((respuesta: VigenciaModel) => {
              this.vigencia = respuesta;
              this.service.buscarPorAbreviatura$(params['componente']).subscribe((respuesta: ComponenteModel) => {
                  this.componente = respuesta;
                  this.cargarAvances(this.vigencia.id, this.componente.id);
                  this.cargarDatosAbiertos(this.vigencia.id, 0, this.componente.id, '');

              }, (error) => {
                  console.log('Error capturado!');
                  return;
              });
          }, (error) => {
              console.log('Error capturado!');
              return;
          });
          
      });
  }

  cargarAvances(vigenciaId: number, componenteId: number) {
      this.service.buscarAvancesPorVigenciaParaComponente$(vigenciaId, componenteId, true).subscribe((respuesta: AvanceGlobalModel[]) => {
          this.avances = respuesta;
          this.cargandoTablero = false;
          this.errorEnTablero  = false;
      }, (error) => {
          this.avances = [];
          this.cargandoTablero = false;
          this.errorEnTablero  = true;
      });
  }

  cargarDatosAbiertos(vigenciaId: number, entidadId: number, componenteId: number, nombreArchivo: string) {
      this.daService.buscarDatosAbiertos$(vigenciaId, entidadId, componenteId, nombreArchivo)
          .subscribe((respuesta: DatoAbiertoModel[]) => {
              this.datos = respuesta;
              this.cargandoDatosAbiertos = false;
              this.errorEnDatosAbiertos  = false;
      }, (error) => {
          this.datos = [];
          this.cargandoDatosAbiertos = false;
          this.errorEnDatosAbiertos  = true;
      });
  }


  /**
   * Getters and setters
   */
  get rutas(): string[][] {
      if (!this.componente) {
          return [[]];
      }
      return [
          ['metas', this.vigencia.nombre, 'componente', this.componente.abreviatura.trim().toLowerCase()]
      ];
  }

}