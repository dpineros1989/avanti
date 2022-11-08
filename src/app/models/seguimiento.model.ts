import { CorteModel } from './corte.model';
import { IndicadorModel } from './indicador.model';

export class SeguimientoModel {

	id                                  : number;
	indicador							: IndicadorModel;
	corte                               : CorteModel;
	fisicoVigente                       : number;
	fisicoEjecucion                     : number;
	presupuestoVigente                  : number;
	presupuestoEjecucion                : number;
	porcentajeFisicaEjecucionManual     : number;
	porcentajePresupuestoEjecucionManual: number;

	constructor(indicador: IndicadorModel, fisicoVigente: number, fisicoEjecucion: number, 
		presupuestoVigente: number, presupuestoEjecucion: number) {

			this.indicador			  = indicador;
			this.fisicoVigente 		  = fisicoVigente;
			this.fisicoEjecucion 	  = fisicoEjecucion;
			this.presupuestoVigente	  = presupuestoVigente;
			this.presupuestoEjecucion = presupuestoEjecucion;
	}
}