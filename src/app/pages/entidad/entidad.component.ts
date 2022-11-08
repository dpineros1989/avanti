import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosAbiertosService } from '../../services/datos-abiertos.service';
import { EntidadService } from '../../services/entidad.service';
import { EntidadModel } from '../../models/entidad.model';
import { AvanceGlobalModel } from '../../models/avance-global.model';
import { DatoAbiertoModel } from '../../models/dato-abierto.model';
import { VigenciaService } from 'src/app/services/vigencia.service';
import { VigenciaModel } from 'src/app/models/vigencia.model';


@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EntidadComponent implements OnInit {

  avances : AvanceGlobalModel[] = [];
  datos   : DatoAbiertoModel[] = [];
  entidad : EntidadModel;
  vigencia: VigenciaModel;
//   nombreVigencia: string;

  // Estados
  cargandoTablero      : boolean = false;
  errorEnTablero       : boolean = false;
  cargandoDatosAbiertos: boolean = false;
  errorEnDatosAbiertos : boolean = false;

  constructor(private route          : ActivatedRoute,
              private service        : EntidadService,
              private vigenciaService: VigenciaService,
              private daService      : DatosAbiertosService) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.cargandoTablero       = true;
          this.errorEnTablero        = false;
          this.cargandoDatosAbiertos = true;
          this.errorEnDatosAbiertos  = false;

          if (!params['vigencia'] || !params['entidad']) {
              this.datos   = [];
              this.avances = [];
              this.cargandoTablero       = false;
              this.errorEnTablero        = true;
              this.cargandoDatosAbiertos = false;
              this.errorEnDatosAbiertos  = true;
              return;
          }
          this.service.buscarPorSigla$(params['entidad']).subscribe((respuesta: EntidadModel) => {
              this.entidad = respuesta;
          });

          this.vigenciaService.buscarPorNombre$(params['vigencia']).subscribe((respuesta: VigenciaModel) => {
                this.vigencia = respuesta;
                this.service.buscarPorSigla$(params['entidad']).subscribe((respuesta: EntidadModel) => {
                    this.entidad = respuesta;
                    this.cargarAvances(this.vigencia.id, this.entidad.id);
                    this.cargarDatosAbiertos(this.vigencia.id, this.entidad.id, 0, '');

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

  cargarAvances(vigenciaId: number, entidadId: number) {
      this.service.buscarAvances$(vigenciaId, entidadId, true).subscribe((respuesta: AvanceGlobalModel[]) => {
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
      if (!this.entidad) {
          return [[]];
      }
      return [
          ['metas', this.vigencia.nombre, 'entidad', this.entidad.sigla.trim().toLowerCase()]
      ];
  }

}