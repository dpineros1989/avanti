
export interface MetaPiModel {

    id         : number;
	proyecto   : ProyectoInversionModel;
	nombre     : string;
    descripcion: string;
    
}

export interface ProyectoInversionModel {
    id: number;
	nombre: string;
	descripcion: string;
}