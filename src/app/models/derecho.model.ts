

export interface DerechoModel {

    id         : number;
    nombre     : string;
    descripcion: string; 
    abreviatura: string;
    iconoFA    : IconoModel;
    orden      : string;
}

interface IconoModel {
    html            : string;
    grande          : string;
    extraGrande     : string;
    superExtraGrande: string;
}