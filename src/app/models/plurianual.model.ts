import { VigenciaModel } from './vigencia.model';


export interface PlurianualModel {

    vigencia             : VigenciaModel;
    presupuestoPlurianual: number;
    presupuestoAprobado  : number;
    presupuestoVigente   : number;
    presupuestoEjecucion : number;

}