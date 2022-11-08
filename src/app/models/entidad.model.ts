import { SectorModel } from './sector.model';


export interface EntidadModel {

    id         : number;
    sector     : SectorModel;
    nombre     : string;
    descripcion: string;
    sigla      : string; 
}