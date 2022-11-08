import { Component, OnInit, Input } from '@angular/core';
import { IndicadorModel } from '../../../models/indicador.model';
import { FileItem } from '../../../models/file-item';
import { CorteModel } from '../../../models/corte.model';
import { CargueSeguimientoModel } from '../../../models/cargue-seguimiento.model';
import { CorteService } from '../../../services/corte.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { SeguimientoModel } from 'src/app/models/seguimiento.model';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { ArchivoBeneficiariosModel } from 'src/app/models/archivo-beneficiarios.model';

@Component({
  selector: 'app-registro-seguimiento',
  templateUrl: './registro-seguimiento.component.html',
  styleUrls: ['./registro-seguimiento.component.css']
})
export class RegistroSeguimientoComponent implements OnInit {
  formulario: FormGroup;
  private suscripciones: Subscription = new Subscription();
  private _indicador : IndicadorModel;

  seguimientoActual: SeguimientoModel;
  archivoBeneficiarios: ArchivoBeneficiariosModel;

  // Estados
  cargando: boolean = false;
  error   : boolean = false;

  porcentajeFisico = 0;
  porcentajeEjecucion = 0;

  items: FileItem[] = [];
  estaSobreElemento: boolean = false;
  ultimoCorte: CorteModel;
  cargues: CargueSeguimientoModel[] = [];

  mensaje: string;
  obteniendoCargues: boolean;
  errorCargandoArchivo: boolean = false;
  errorObteniendoCargues: boolean = false;
  esPosibleCargarArchivos: boolean = true;

  usuario: Usuario = JSON.parse(localStorage.getItem('avantiUser'));

  constructor(private fb      : FormBuilder,
              private _seguimientoService: SeguimientoService,
              private _corteservice: CorteService) { }

  ngOnInit() {
    this.cargarCorteParaRegistro();
    this.crearFormulario();
  }

  cargarCorteParaRegistro() {
    this._corteservice.buscarUltimoCorteActivo$().subscribe((respuesta: CorteModel) => {
      this.ultimoCorte = respuesta;
      this._seguimientoService.obtenerSeguimiento$(this.indicador.id, this.ultimoCorte.id).subscribe((seguimiento: SeguimientoModel) => {
        this.seguimientoActual = seguimiento;
        if (seguimiento) {
          this.formulario.reset({
            fisicoEjecucion : seguimiento.fisicoEjecucion,
            pptoVigente  : seguimiento.presupuestoVigente,
            pptoEjecucion: seguimiento.presupuestoEjecucion
          });

          // Verificando si existe un archivo de beneficiarios cargado previamente
          this.descargarArchivo(seguimiento.id);
        }
        // console.log(this.seguimientoActual);
      }, (error) => {
        this.seguimientoActual = undefined;
        this.limpiarFormulario();
      });
    }, error => {
      this.ultimoCorte = undefined;
      console.log('Error!!!', error);
    });
  }

  limpiarFormulario() {
    // this.eliminarEscuchadores();
    this.formulario.reset({
      fisicoEjecucion : 0,
      pptoVigente  : 0,
      pptoEjecucion: 0
    });
    this.limpiarArchivo();
    this.cargando  = false;
    // this.crearEscuchadoresPorcentaje();
  }

  private eliminarEscuchadores() {
      this.suscripciones.unsubscribe();
      this.suscripciones = new Subscription();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      fisicoEjecucion : [0, Validators.required],
      pptoVigente     : [0, Validators.required],
      pptoEjecucion   : [0, Validators.required],
    });
    this.crearEscuchadoresPorcentaje();
  }

  crearEscuchadoresPorcentaje() {
    // Avance Fisico
    const suscripcionFisico = this.formulario.controls['fisicoEjecucion'].valueChanges.subscribe((fisicoEjecucion: number) => {
      if (this.indicador.metaFisica < 0) {
        if (fisicoEjecucion > 0) {
          this.porcentajeFisico = 100;
        } else {
          this.porcentajeFisico = 0;
        }
      } else if (this.indicador.metaFisica > 0) {
        this.porcentajeFisico = fisicoEjecucion / this.indicador.metaFisica > 1 ? 100 : fisicoEjecucion / this.indicador.metaFisica * 100;
      } else {
        this.porcentajeFisico = 0;
      }
    });

    // Avance Presupuestal - Presupuesto Vigente
    const suscripcionPptoVigente = this.formulario.controls['pptoVigente'].valueChanges.subscribe((pptoVigente: number) => {
      const pptoEjecucion = this.formulario.controls['pptoEjecucion'].value;
      if (pptoVigente < 0) {
        if (pptoEjecucion > 0) {
          this.porcentajeEjecucion = 100;
        } else {
          this.porcentajeEjecucion = 0;
        }
      } else if (pptoVigente > 0) {
        this.porcentajeEjecucion = pptoEjecucion / pptoVigente > 1 ? 100 : pptoEjecucion / pptoVigente * 100;
      } else {
        this.porcentajeEjecucion = 0;
      }
    });

    // Avance Presupuestal - Presupuesto Ejecutado
    const suscripcionPptoEjecutado = this.formulario.controls['pptoEjecucion'].valueChanges.subscribe((pptoEjecucion: number) => {
      const pptoVigente = this.formulario.controls['pptoVigente'].value;
      if (pptoVigente < 0) {
        if (pptoEjecucion > 0) {
          this.porcentajeEjecucion = 100;
        } else {
          this.porcentajeEjecucion = 0;
        }
      } else if (pptoVigente > 0) {
        this.porcentajeEjecucion = pptoEjecucion / pptoVigente > 1 ? 100 : pptoEjecucion / pptoVigente * 100;
      } else {
        this.porcentajeEjecucion = 0;
      }
    });

    this.suscripciones.add(suscripcionFisico);
    this.suscripciones.add(suscripcionPptoVigente);
    this.suscripciones.add(suscripcionPptoEjecutado);
  }

  guardar() {
    if (this.formulario.invalid) {
      console.log('Error en el formulario!');
      return;
    }
    // console.log(this.formulario.value);
    const seguimiento = new SeguimientoModel(this.indicador, 
                        this.indicador.metaFisica, this.formulario.value['fisicoEjecucion'], 
                        this.formulario.value['pptoVigente'], this.formulario.value['pptoEjecucion']);
    
    // TODO: Mostrar mensaje que existe un seguimiento aprobado previamente
    // TODO: Mostrar mensajes de error con swal
    this._seguimientoService.registrarSeguimiento$(this.indicador.id, this.ultimoCorte.id, seguimiento).subscribe((seguimiento: SeguimientoModel) => {
      // En caso de registrarse con exito el seguimiento
      if (seguimiento && seguimiento.id) {
        Swal.fire({
          title        : `Procesado!`,
          text         : 'Seguimiento cargado con éxito',
          icon         : 'success'
        });
        if (this.items.length > 0) {
          this._seguimientoService.adjuntarArchivoBeneficiarios$(seguimiento.id, this.primerItem.archivo).subscribe(
            event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.primerItem.progreso = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                console.log(event);
                this.mensaje = '';
                this.items = [];
                this.cargando = false;
                this.error = false;
                this.errorCargandoArchivo = false;
                // Swal.fire({
                //   title        : event.body ? event.body.message : 'Seguimiento cargado con éxito!',
                //   icon         : 'success'
                // });
              }
            }, 
            (error) => {
              console.log(error);
              this.cargando = false;
              this.error = true;
              this.primerItem.progreso = 0;
              this.errorCargandoArchivo = true;
              this.mensaje = 'No fue posible cargar archivo!';
            });
        }
        
      } else {
        this.cargando = false;
        this.error = true;
        this.mensaje = 'No fue posible registrar el seguimiento';
        Swal.fire({
          title        : `Oops!`,
          text         : `${this.mensaje}. Revise que esté todo correcto e intente nuevamente`,
          icon         : 'error'
        });
      }
      
    }, (error) => {
      console.log(error);
      if (error.status) {
        switch (error.status) {
          case 0:
            this.mensaje = 'El servidor del sistema no se encuentra disponible';
            break;
          case 400:
            this.mensaje = 'Existe un conflicto al intentar registrar el seguimiento';
            break;
          case 409:
            this.mensaje = 'El seguimiento en el corte ya se encuentra aprobado y no puede ser modificado';
            break;
          case 500:
            this.mensaje = 'Ocurrió un error interno al intentar registrar el seguimiento';
            break;
          case 200:
            this.mensaje = '';
            break;
          default:
            this.mensaje = 'No fue posible registrar el seguimiento';
            break;
        }
      } else {
        this.mensaje = error.status && error.status !== 200 ? 'No fue posible registrar el seguimiento' : '';
      }
      this.cargando = false;
      this.error = true;
      Swal.fire({
        title        : `Oops!`,
        text         : `${this.mensaje}. Revisa que esté todo correcto e intenta nuevamente`,
        icon         : 'error'
      });
    });
  }

  cargarArchivo() {
    if (!this.primerItem) {
      return;
    }

    this.primerItem.progreso = 0;
    this.mensaje = undefined;
    this.errorCargandoArchivo = false;
  }

  descargarArchivo(seguimientoId: number) {
    this._seguimientoService.obtenerArchivoBeneficiarios$(seguimientoId).subscribe((respuesta: ArchivoBeneficiariosModel) => {
      this.archivoBeneficiarios = respuesta;
    } , (error) => {
      this.archivoBeneficiarios = undefined;
    });
  }

  limpiarArchivo() {
    this.items = [];
  }

  aprobarSeguimiento() {
    this._seguimientoService.aprobarSeguimiento$(this.seguimientoActual.id).subscribe(respuesta => {
      Swal.fire({
        title        : `Aprobado!`,
        text         : 'El seguimiento aprobado ya no podrá ser modificado',
        icon         : 'success'
      });
    }, (error) => {
      console.log('Error!', error);
    });
  }

  desaprobarSeguimiento() {
    this._seguimientoService.desaprobarSeguimiento$(this.seguimientoActual.id).subscribe(respuesta => {
      Swal.fire({
        title        : `Desaprobado!`,
        text         : 'Seguimiento desaprobado. Podrá ser modificado',
        icon         : 'success'
      });
    }, (error) => {
      console.log('Error!', error);
    });
  }

  /*
  * Getters and setters
  */
  get primerItem(): FileItem {
    if (this.items.length === 0) {
      return;
    }
    return this.items[0];
  }
  
  @Input() set indicador(valor: IndicadorModel) {
      this.cargando = true;
      this._indicador = valor;
      //TODO: Cargar datos para registrar seguimiento. Que se necesita???
      // this.cargarAvancesParaGraficar();
  }
  get indicador(): IndicadorModel {
      return this._indicador;
  }

}
