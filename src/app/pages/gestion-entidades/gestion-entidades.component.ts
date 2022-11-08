import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CorteModel } from '../../models/corte.model';
import { CargueSeguimientoModel } from '../../models/cargue-seguimiento.model'
import { CargueService } from '../../services/cargue.service';
import { CorteService } from '../../services/corte.service';
import { EntidadModel } from '../../models/entidad.model';
import { VigenciaModel } from '../../models/vigencia.model';
import { VigenciaService } from '../../services/vigencia.service';

@Component({
  selector: 'app-gestion-entidades',
  templateUrl: './gestion-entidades.component.html',
  styleUrls: ['./gestion-entidades.component.css']
})
export class GestionEntidadesComponent implements OnInit {

  formulario: FormGroup;
  vigencias: VigenciaModel[] = [];
  cortes: CorteModel[] = [];
  entidades: EntidadModel[] = [];
  ultimoCorte: CorteModel;
  cargues: CargueSeguimientoModel[] = [];

  mensaje: string;
  obteniendoCargues: boolean;
  errorObteniendoCargues: boolean = false;
  ultimaEntidadIdSeleccionado: number;

  constructor(private _fb: FormBuilder,
              private _cargueService: CargueService,
              private _vigenciaService: VigenciaService,
              private _corteService: CorteService) { }

  ngOnInit() {
    this.crearFormulario();
    // Buscar todas las vigencias
    this._vigenciaService.buscarTodas$().subscribe((respuesta: VigenciaModel[]) => {
      this.vigencias = respuesta;
      let vigenciaActual = this.vigencias.find(vigencia => vigencia.actual);

      if (vigenciaActual) {
        this.formulario.get('vigenciaId').reset(vigenciaActual.id);
      }

    }, error => {
      this.vigencias = [];
      if (error.status != 404) {
        console.log('Error!!!', error);
      }
    });
  }

  cargarCortesPorVigencia(vigenciaId: number) {
    this._corteService.buscarTodos$(vigenciaId).subscribe((respuesta: CorteModel[]) => {
      this.cortes = respuesta;
      this.ultimoCorte = this.cortes.length > 0 ? this.cortes[0] : undefined;
      this.formulario.get('corteId').reset(this.ultimoCorte.id);

    }, error => {
      this.cortes = [];
      if (error.status != 404) {
        console.log('Error!!!', error);
      }
    });
  }

  limpiarFormulario() {
    this.cargues = [];
    this.formulario.reset({
      vigenciaId: 0,
      corteId   : 0
    });
  }

  crearFormulario() {
    this.formulario = this._fb.group({
      vigenciaId: [0],
      corteId   : [0]
    });
    this.formulario.get('vigenciaId').valueChanges.subscribe(vigenciaId => {
      this.cargarCortesPorVigencia(vigenciaId);
    });
    // this.formulario.get('corteId').valueChanges.subscribe(corteId => {
    //   this.actualizarCargues();
    // });
  }

  actualizarCargues() {
    if (this.formulario.value.invalid) {
        return;
    }

    this.obteniendoCargues = true;
    this.errorObteniendoCargues = false;
    this.ultimoCorte = this.cortes.find(corte => corte.id === Number(this.formulario.value['corteId']));
    this._cargueService.obtenerCargues$(
              this.formulario.value['corteId']).subscribe((respuesta: CargueSeguimientoModel[]) => {

      this.cargues = respuesta;
      this.obteniendoCargues = false;
      this.errorObteniendoCargues = false;

    }, error => {
      this.cargues = [];
      this.obteniendoCargues = false;
      this.errorObteniendoCargues = error.status != 404 ? true : false;
    });
  }

}