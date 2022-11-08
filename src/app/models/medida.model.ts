import { ComponenteModel } from './componente.model';
import { DerechoModel } from './derecho.model';

export interface MedidaModel {

    id         : number;
    componente : ComponenteModel;
    derecho    : DerechoModel;
    nombre     : string;
    descripcion: string;
    orden      : number;

}