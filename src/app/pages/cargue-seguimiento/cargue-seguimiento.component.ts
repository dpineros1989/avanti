import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2'
import { FileItem } from '../../models/file-item';
import { CargueService } from '../../services/cargue.service';
import { CargueSeguimientoModel } from '../../models/cargue-seguimiento.model';
import { CorteService } from '../../services/corte.service';
import { CorteModel } from '../../models/corte.model';

@Component({
  selector: 'app-cargue-seguimiento',
  templateUrl: './cargue-seguimiento.component.html',
  styleUrls: ['./cargue-seguimiento.component.css']
})
export class CargueSeguimientoComponent implements OnInit {

  items: FileItem[] = [];
  estaSobreElemento: boolean = false;
  ultimoCorte: CorteModel;
  cargues: CargueSeguimientoModel[] = [];

  mensaje: string;
  obteniendoCargues: boolean;
  errorCargandoArchivo: boolean = false;
  errorObteniendoCargues: boolean = false;
  esPosibleCargarArchivos: boolean = true;

  constructor(private _cargueService: CargueService,
    private _corteservice: CorteService) { }

  ngOnInit() {
    this._corteservice.buscarUltimoCorteActivo$().subscribe((respuesta: CorteModel) => {
      this.ultimoCorte = respuesta;
      this.actualizarCargues();
    }, error => {
      this.ultimoCorte = undefined;
      console.log('Error!!!', error);
    });
  }

  actualizarCargues() {
    this.obteniendoCargues = true;
    this.errorObteniendoCargues = false;
    this._cargueService.obtenerCargues$(this.ultimoCorte.id).subscribe((respuesta: CargueSeguimientoModel[]) => {
      // console.log(respuesta);
      this.cargues = respuesta;
      this.obteniendoCargues = false;
      this.errorObteniendoCargues = false;
      this.esPosibleCargarArchivos = !this.cargues.some(cargue => cargue.aprobado);
      // console.log(this.esPosibleCargarArchivos);
    }, error => {
      // console.log(error);
      this.cargues = [];
      this.obteniendoCargues = false;
      this.errorObteniendoCargues = error.status != 404 ? true : false;
    });
  }

  cargarArchivo() {
    if (!this.primerItem) {
      return;
    }

    this.primerItem.progreso = 0;
    this.mensaje = undefined;
    this.errorCargandoArchivo = false;
    this._cargueService.cargarSeguimiento$(this.ultimoCorte.id, this.primerItem.archivo).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.primerItem.progreso = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          // console.log(event);
          this.mensaje = '';
          this.items = [];
          this.errorCargandoArchivo = false;
          this.actualizarCargues();
          Swal.fire({
            title        : event.body ? event.body.message : 'Seguimiento cargado con éxito!',
            icon         : 'success'
          });
        }
      },
      error => {
        // console.log(error);
        this.primerItem.progreso = 0;
        this.errorCargandoArchivo = true;
        this.mensaje = 'No fue posible cargar archivo!';
      });
  }

  limpiarArchivo() {
    this.items = [];
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

}
