import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from '../../../services/indicador.service';
import { EntidadService } from '../../../services/entidad.service';
import { ComponenteService } from '../../../services/componente.service';
import { CorteService } from '../../../services/corte.service';
import { EntidadModel } from '../../../models/entidad.model';
import { ComponenteModel } from '../../../models/componente.model';
import { CorteModel } from '../../../models/corte.model';
import { IndicadorModel } from '../../../models/indicador.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {
    @Input() titulo: string;
    corteSeleccionado     : CorteModel;
    corteParaRegistro     : CorteModel;
    entidadSeleccionada   : EntidadModel;
    componenteSeleccionado: ComponenteModel;
    indicadores           : IndicadorModel[] = [];
    indicadorSeleccionado : IndicadorModel;
    mostrarDetalle        : boolean = false;
    mostrarRegistro       : boolean = false;
    usuario: Usuario = JSON.parse(localStorage.getItem('avantiUser'));
    
    constructor(private route            : ActivatedRoute,
                private service          : IndicadorService,
                private corteService     : CorteService,
                private entidadService   : EntidadService,
                private componenteService: ComponenteService) { }
    
    ngOnInit() {
        this.route.params.subscribe(params => {
            if (!params['vigencia']) {
                return;
            }
        
            this.corteService.buscarMostrablesAlPublico$().subscribe((respuesta: CorteModel[]) => {
                this.corteSeleccionado = respuesta.find(item => {
                    return item.vigencia.nombre.trim() === params['vigencia'].trim();
                });
                if (!this.corteSeleccionado) {
                    return;
                }
                
                if (params['entidad']) {
                    this.entidadService.buscarPorSigla$(params['entidad'].trim()).subscribe((respuesta: EntidadModel) => {
                        this.entidadSeleccionada = respuesta;
        
                        // Obteniendo indicadores de una entidad
                        this.service.buscarTodosEnEntidad$(this.corteSeleccionado.id, this.entidadSeleccionada.id).subscribe((respuesta: IndicadorModel[]) => {
                            if (this.entidadSeleccionada && respuesta.length > 0) {
                                this.indicadores = respuesta;
                                this.titulo = `${this.entidadSeleccionada.nombre.trim()} - Vigencia ${params['vigencia'].trim()}`;
                            }
                        });
                    });
        
                } else if (params['componente']) {
                    this.componenteService.buscarPorAbreviatura$(params['componente'].trim()).subscribe((respuesta: ComponenteModel) => {
                        this.componenteSeleccionado = respuesta;
        
                        // Obteniendo indicadores de un componente
                        this.service.buscarTodosEnComponente$(this.corteSeleccionado.id, this.componenteSeleccionado.id).subscribe((respuesta: IndicadorModel[]) => {
                            if (this.componenteSeleccionado && respuesta.length > 0) {
                                this.indicadores = respuesta;
                                this.titulo = `${this.componenteSeleccionado.nombre.trim()} - Vigencia ${params['vigencia'].trim()}`;
                            }
                        });
                    });
                }
            });
            
        });

        this.corteService.buscarUltimoCorteActivo$().subscribe((respuesta: CorteModel) => {
            if (respuesta) {
                this.corteParaRegistro = respuesta;
            }
        });
        // this.usuario = JSON.parse(localStorage.getItem('avantiUser'));
        // console.log(this.usuario);
        // TODO: Validar que solo se puedan editar los indicadores que tengan vigencia igual al 
        // corte activo para registrar info

    }

    verDetalle(indicador: IndicadorModel) {
        this.mostrarDetalle = true;
        this.indicadorSeleccionado = indicador;
    }

    ocultarDetalle() {
        delete(this.indicadorSeleccionado);
        this.mostrarDetalle = false;
    }

    verRegistro(indicador: IndicadorModel) {
        this.mostrarRegistro = true;
        this.indicadorSeleccionado = indicador;
    }

    ocultarRegistro() {
        delete(this.indicadorSeleccionado);
        this.mostrarRegistro = false;
    }

}