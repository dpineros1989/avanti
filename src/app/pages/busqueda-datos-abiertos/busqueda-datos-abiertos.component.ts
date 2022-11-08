import { Component, OnInit } from '@angular/core';
import { DatosAbiertosService } from '../../services/datos-abiertos.service';
import { ComponenteModel } from '../../models/componente.model';
import { EntidadModel } from '../../models/entidad.model';
import { EntidadService } from '../../services/entidad.service';
import { ComponenteService } from '../../services/componente.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatoAbiertoModel } from 'src/app/models/dato-abierto.model';
import { CorteService } from 'src/app/services/corte.service';
import { CorteModel } from 'src/app/models/corte.model';
import { VigenciaModel } from 'src/app/models/vigencia.model';
import { VigenciaService } from 'src/app/services/vigencia.service';

@Component({
  selector: 'app-busqueda-datos-abiertos',
  templateUrl: './busqueda-datos-abiertos.component.html',
  styleUrls: ['./busqueda-datos-abiertos.component.css']
})
export class BusquedaDatosAbiertosComponent implements OnInit {

  formulario    : FormGroup;
  entidades     : EntidadModel[]     = [];
  componentes   : ComponenteModel[]  = [];
  datos         : DatoAbiertoModel[] = [];
  titulo        : string = 'Búsqueda de datos abiertos';
  vigencia      : VigenciaModel;
//   nombreVigencia: string;

  // Estados
  cargando: boolean = false;

  constructor(private fb               : FormBuilder,
              private route            : ActivatedRoute,
              private service          : DatosAbiertosService,
              private entidadService   : EntidadService,
              private componenteService: ComponenteService,
              private corteService     : CorteService) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        if (params["vigencia"]) {
            this.corteService.buscarMostrablesAlPublico$().subscribe((respuesta: CorteModel[]) => {
                const corteSeleccionado = respuesta.find(item => {
                    return item.vigencia.nombre.trim() === params["vigencia"].trim();
                });

                if (!corteSeleccionado) {
                    return;
                }
                this.vigencia = corteSeleccionado.vigencia;
                this.entidadService.buscarTodos$(corteSeleccionado.id).subscribe((respuesta: EntidadModel[]) => {
                    this.entidades = respuesta;
                });
                this.componenteService.buscarTodos$().subscribe((respuesta: ComponenteModel[]) => {
                    this.componentes = respuesta;
                });
                this.crearFormulario();
            });
        }
    });
  }

  limpiarFormulario() {
    this.datos = [];
    this.formulario.reset({
        vigencia     : this.vigencia.id,
        nombreArchivo: '',
        entidadId    : 0,
        componenteId : 0
    });
  }

  crearFormulario() {
        this.formulario = this.fb.group({
            vigencia     : [this.vigencia.id],
            nombreArchivo: [''],
            entidadId    : [0],
            componenteId : [0]
        });
        this.formulario.controls['vigencia'].reset(this.vigencia.id);
        this.titulo = `${this.titulo} en la vigencia ${this.vigencia.nombre}`;
  }

  buscarDatosAbiertos() {
      if (this.formulario.invalid) {
          return;
      }
      this.cargando = true;
      this.service.buscarDatosAbiertos$(this.formulario.value['vigencia'], 
                                        this.formulario.value['entidadId'], 
                                        this.formulario.value['componenteId'],
                                        this.formulario.value['nombreArchivo']
                                        ).subscribe((respuesta: DatoAbiertoModel[]) => {
          this.datos = respuesta;
          this.cargando = false;
      }, (error) => {
          this.datos = [];
          this.cargando = false;
      });
  }

}
