import { EntidadModel } from './entidad.model';
import { CorteModel } from './corte.model';
import { RetroalimentacionModel } from './retroalimentacion.model';

export interface CargueSeguimientoModel {

    id               : number;
    archivo          : string;
    entidad          : EntidadModel;
    corte            : CorteModel;
    fecha            : Date;
    fechaFormateada  : string;
    aprobado         : boolean;
    procesado        : boolean;
    retroalimentacion: RetroalimentacionModel;
}