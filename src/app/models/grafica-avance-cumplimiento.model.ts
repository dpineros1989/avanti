import { Serie } from './serie.model';

export interface GraficaAvanceCumplimiento {
    titulo    : string,
    categorias: string[];
    series    : Serie[];
}