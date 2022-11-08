import { EntidadModel } from './entidad.model';
import { VigenciaModel } from './vigencia.model';
import { MedidaModel } from './medida.model';
import { SeguimientoModel } from './seguimiento.model';
import { MetaPiModel } from './meta-pi.model';
import { FuenteFinanciacionModel } from './fuente-financiacion.model';


export interface IndicadorModel {

    id              : number;
    metaPad         : string;
    entidad         : EntidadModel;
    vigencia        : VigenciaModel;
    tipo            : TipoIndicadorModel;
    tipoOferta      : TipoOfertaIndicadorModel;
    unidadMedida    : string;

    metaFisica      : number;
    metaPresupuestal: number;
    principal       : boolean,
    medidas         : MedidaModel[];
    seguimientos    : SeguimientoModel[];
    metasPI         : MetaPiModel[];
    fuentesFinanciacion: FuenteFinanciacionModel[];
    descripcion     : string;

}

export interface TipoIndicadorModel {
    id: number;
	nombre: string;
	descripcion: string;
}

export interface TipoOfertaIndicadorModel {
    id: number;
	nombre: string;
	descripcion: string;
}