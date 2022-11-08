import { SeguimientoModel } from './seguimiento.model';

export interface ArchivoBeneficiariosModel {
    id         : number;
    seguimiento: SeguimientoModel;
    archivo    : string;
}