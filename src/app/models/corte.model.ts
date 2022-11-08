import { VigenciaModel } from './vigencia.model';

export interface CorteModel {

    id      : number;
    vigencia: VigenciaModel;
    nombre  : string;
    orden   : string;

}