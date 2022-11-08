import { VigenciaModel } from './vigencia.model';
import { EntidadModel } from './entidad.model';
import { ComponenteModel } from './componente.model';


export interface DatoAbiertoModel {

    id         : number;
    vigencia   : VigenciaModel;
    entidad    : EntidadModel;
    componente : ComponenteModel;
    archivo    : string;
    url        : string;
    descripcion: string;
    tipo       : TipoArchivoModel;
}

interface TipoArchivoModel {
    
    icono      : string;
    abreviatura: string;
    nombre     : string;
    descripcion: string;
}