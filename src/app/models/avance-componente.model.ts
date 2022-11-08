import { ComponenteModel } from './componente.model';
import { CorteModel } from './corte.model';


export interface AvanceComponenteModel {

    componente          : ComponenteModel;
    corte               : CorteModel;
    metas               : number;
    fisico              : number;
    presupuestoAprobado : number;
    presupuestoVigente  : number;
    presupuestoEjecucion: number;
}