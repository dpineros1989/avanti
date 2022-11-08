import { CorteModel } from './corte.model';


export interface AvanceGlobalModel {

    corte               : CorteModel;
    metas               : number;
    fisicoProgramacion  : number;
    fisicoEjecucion     : number;
    presupuestoAprobado : number;
    presupuestoVigente  : number;
    presupuestoEjecucion: number;
}